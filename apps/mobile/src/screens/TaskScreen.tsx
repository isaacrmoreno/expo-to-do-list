import React, { useEffect, useRef, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import tw from 'twrnc'
import {
  KeyboardAvoidingView,
  View,
  TextInput,
  Keyboard,
  ScrollView,
  useColorScheme,
  TouchableOpacity,
  Text,
  Platform,
} from 'react-native'
import { EvilIcons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { Audio } from 'expo-av'
import * as ScreenOrientation from 'expo-screen-orientation'
import AddTaskButton from '../components/AddTaskButton'
import DrawerToggle from '../components/DrawerToggle'
import useStore from '../store/index'
import { Item } from '../types/index'

import DraggableFlatList, {
  ScaleDecorator,
  RenderItemParams,
} from 'react-native-draggable-flatlist'
// import { FlatList, renderItem } from '../components/Flatlist'
import { v4 as uuidv4 } from 'uuid'

export default function TaskScreen() {
  const [task, setTask] = useState<string>('')
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [taskList, setTaskList] = useState<object[]>([])
  const [updateIcon, setUpdateIcon] = useState<boolean>(false)
  const [isDisabled, setIsDisabled] = useState<boolean>(true)
  const [sound, setSound] = useState<object>()

  const stylized = useStore((state) => state?.stylized)
  const isMuted = useStore((state) => state?.isMuted)

  const inputRef = useRef('')
  const colorScheme = useColorScheme()

  const colors = {
    odd: ['#40c9ff', '#e81cff'],
    even: ['#f093fb', '#f5576c'],
  }

  const getColor = (index: number) => {
    let taskColor = null
    index % 2 === 0 ? (taskColor = colors.odd) : (taskColor = colors.even)
    return taskColor
  }

  const taskId = uuidv4()

  const taskData: Item[] = [...Array(taskList?.length)].map((d, index) => {
    return {
      // key: taskId,
      // key: taskList[index],
      key: index,
      description: taskList[index]?.description,
    }
  })

  // To do
  // Double check to see if I can get away using this taskData without UUID to save on bundle size. (if not no worries, its small anyway)
  // See how much of this I can build with just taskData, so i'm not duplicating a bunch of code.
  // get this to save with async storage as it
  // save with async storage, when reorganized.
  // save with async storage, when updating copy.

  // task list, is then fed into

  const [data, setData] = useState(taskData)

  const handleAddTask = async (index: number) => {
    try {
      const { sound } = await Audio.Sound.createAsync(require('../../assets/sounds/chime.mp3'), {
        volume: 0.2,
        isMuted: isMuted,
      })
      setSound(sound)
      await sound.playAsync()
      setTaskList([...taskList, { description: task }]) // will remove later?
      // setData([...data, { description: task, key: taskId }])
      setData(data)
      taskList.push({ description: task })
      data.push({ description: task, key: taskId })
      setTask('')
      // const jsonValue = JSON.stringify(taskList) < ------ old
      const jsonValue = JSON.stringify(data)
      console.log('jsonValue', jsonValue)
      await AsyncStorage.setItem('@taskList', jsonValue)
    } catch (e) {
      console.log(e)
    }
  }

  const getTaskList = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@taskList')
      // jsonValue !== null && setTaskList(JSON.parse(jsonValue))
      jsonValue !== null && setData(JSON.parse(jsonValue))
    } catch (e) {
      console.log(e)
    }
  }

  const editTask = (index: number) => {
    inputRef?.current?.focus()
    setUpdateIcon(true)
    const newTask = taskList[index]?.description
    setTask(newTask)
    setCurrentIndex(index)
  }

  const handleUpdateTask = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(require('../../assets/sounds/chime.mp3'), {
        volume: 0.2,
        isMuted: isMuted,
      })
      setSound(sound)
      await sound.playAsync()
      setUpdateIcon(false)
      Keyboard.dismiss()
      let updatedTaskList = [...taskList]
      // let updatedTaskList = [...data[index]?.description]
      updatedTaskList.splice(currentIndex, 1, { description: task })
      setTaskList(updatedTaskList)
      setTask('')
      const jsonValue = JSON.stringify(updatedTaskList)
      await AsyncStorage.setItem('@taskList', jsonValue)
    } catch (e) {
      console.log(e)
    }
  }

  const completeTask = async (index: number) => {
    // const completeTask = async (key: string) => {
    try {
      const { sound } = await Audio.Sound.createAsync(require('../../assets/sounds/bloop.mp3'), {
        volume: 0.2,
        isMuted: isMuted,
      })
      setSound(sound)
      await sound.playAsync()
      // let UpdatedTaskList = [...taskList]
      let UpdatedTaskList = [...data]
      // UpdatedTaskList.splice(index, 1)
      console.log('UpdatedTaskList', UpdatedTaskList)
      UpdatedTaskList.splice(data[index]?.key, 1) // undefined
      // setTaskList(UpdatedTaskList)
      setData(UpdatedTaskList)
      setUpdateIcon(false)
      await AsyncStorage.setItem('@taskList', JSON.stringify(UpdatedTaskList))
    } catch (e) {
      console.log(e)
    }
  }

  const changeScreenOrientation = async () => {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT)
  }

  useEffect(() => {
    task?.length !== 0 ? setIsDisabled(false) : setIsDisabled(true)
  }, [task])

  useEffect(() => {
    getTaskList()
  }, [])

  useEffect(() => {
    changeScreenOrientation()
  }, [])

  useEffect(() => {
    return sound ? () => sound.unloadAsync() : undefined
  }, [sound])

  const renderItem = ({ item, drag, isActive }: RenderItemParams<Item>) => {
    return (
      <ScaleDecorator>
        <View style={tw`px-6 mt-4`}>
          <TouchableOpacity
            onPress={() => editTask(parseInt(item?.key))}
            style={tw`justify-between`}
            onLongPress={drag}
            disabled={isActive}>
            <LinearGradient
              colors={getColor(parseInt(item?.key))}
              style={tw`p-2 flex-row rounded-lg mb-4 items-center`}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}>
              <Text
                style={[
                  tw`w-11/12 text-base`,
                  colorScheme === 'dark' ? tw`text-white` : tw`text-black`,
                ]}>
                {item?.description}
              </Text>
              <EvilIcons
                name='check'
                size={32}
                color={colorScheme === 'dark' ? 'white' : 'black'}
                onPress={() => completeTask(parseInt(item?.key))}
              />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScaleDecorator>
    )
  }

  return (
    <View style={[tw`flex-1`, colorScheme === 'dark' ? tw`bg-neutral-800` : tw`bg-slate-100`]}>
      <DrawerToggle />

      {(stylized as boolean) ? (
        <DraggableFlatList
          data={data}
          onDragEnd={({ data }) => {
            setData(data)
            AsyncStorage.setItem('@taskList', JSON.stringify(data))
          }}
          keyExtractor={(item) => item.key}
          renderItem={renderItem}
        />
      ) : (
        <ScrollView style={tw`px-6 mt-4`}>
          {taskList.map((taskList, index) => {
            return (
              <View key={index}>
                <TouchableOpacity
                  onPress={() => editTask(index)}
                  style={[
                    tw`bg-white p-2 flex-row rounded-lg items-center mb-4`,
                    colorScheme === 'dark' && tw`bg-neutral-700`,
                  ]}>
                  <Text
                    style={[
                      tw`w-11/12 text-base`,
                      colorScheme === 'dark' ? tw`text-white` : tw`text-black`,
                    ]}>
                    {taskList?.description}
                  </Text>
                  <EvilIcons
                    name='check'
                    size={32}
                    color={colorScheme === 'dark' ? 'white' : 'black'}
                    onPress={() => completeTask(index)}
                  />
                </TouchableOpacity>
              </View>
            )
          })}
        </ScrollView>
      )}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'position' : 'height'}
        style={tw`absolute bottom-4`}>
        <View style={tw`flex-row justify-between px-5`}>
          <TextInput
            style={[
              tw`p-4 mb-4 rounded-full border`,
              isDisabled ? tw`w-full` : tw`w-4/5`,
              colorScheme === 'dark'
                ? tw`bg-neutral-700 text-white border-white`
                : tw`bg-white text-black`,
            ]}
            ref={inputRef}
            value={task}
            placeholder={'Write a task'}
            clearButtonMode='while-editing'
            onChangeText={(text) => setTask(text)}
          />
          {isDisabled ? null : updateIcon ? (
            <AddTaskButton name='check' onPress={handleUpdateTask} />
          ) : (
            <AddTaskButton name='plus' onPress={handleAddTask} />
          )}
        </View>
      </KeyboardAvoidingView>
    </View>
  )
}
