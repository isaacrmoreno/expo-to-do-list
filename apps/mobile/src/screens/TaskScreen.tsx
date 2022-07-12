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
import { MaterialIcons } from '@expo/vector-icons'

import useStore from '../store/index'
import { Item } from '../types/index'

import DraggableFlatList, {
  ScaleDecorator,
  RenderItemParams,
} from 'react-native-draggable-flatlist'
import { FlatList, renderItem } from 'react-native-gesture-handler'
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

  // const NUM_ITEMS = 10
  // function getColor(i: number) {
  //   const multiplier = 255 / (NUM_ITEMS - 1)
  //   const colorVal = i * multiplier
  //   return `rgb(${colorVal}, ${Math.abs(128 - colorVal)}, ${255 - colorVal})`
  // }

  // type Item = {
  //   key: string
  //   label: string
  //   height: number
  //   width: number
  //   backgroundColor: string
  // }

  // const taskData: Item[] = [...Array(taskList?.length)].map((d, index) => {
  //   return {
  //     key: `item-${index}`,
  //     description: taskList[index]?.description,
  //   }
  // })

  const NUM_ITEMS = 4

  // const initialData: Item[] = [...Array(NUM_ITEMS)].map((d, index) => {
  const initialData: Item[] = [...Array(taskList?.length)].map((d, index) => {
    console.log('taskList?.length', taskList?.length)
    // console.log(uuidv4())

    return {
      // key: `item-${index}`,
      key: uuidv4(),
      // description: String(index) + '',
      // description: String(taskList[index]?.description) + '',
      // description: taskList[index]?.description,
      description: taskList[index]?.description,
    }
  })

  const [data, setData] = useState(initialData)

  const handleAddTask = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(require('../../assets/sounds/chime.mp3'), {
        volume: 0.2,
        isMuted: isMuted,
      })
      setSound(sound)
      await sound.playAsync()
      setTaskList([...taskList, { description: task }])
      setData([...taskList, { description: task, key: uuidv4() }])
      taskList.push({ description: task })
      setTask('')
      const jsonValue = JSON.stringify(taskList)
      await AsyncStorage.setItem('@taskList', jsonValue)
    } catch (e) {
      console.log(e)
    }
  }

  const getTaskList = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@taskList')
      jsonValue !== null && setTaskList(JSON.parse(jsonValue))
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
    try {
      const { sound } = await Audio.Sound.createAsync(require('../../assets/sounds/bloop.mp3'), {
        volume: 0.2,
        isMuted: isMuted,
      })
      setSound(sound)
      await sound.playAsync()
      let UpdatedTaskList = [...taskList]
      UpdatedTaskList.splice(index, 1)
      setTaskList(UpdatedTaskList)
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

  // const renderItem = ({ item, drag, isActive, index }: RenderItemParams<Item>) => {
  //   return (
  //     <ScaleDecorator>
  //       <View style={tw`items-center`}>
  //         <TouchableOpacity
  //           onLongPress={drag}
  //           disabled={isActive}
  //           style={[
  //             tw`flex-row w-4/5 rounded-lg mb-6 items-center`,
  //             { backgroundColor: isActive ? 'red' : 'white' },
  //           ]}>
  //           <View>
  //             <MaterialIcons
  //               name='drag-indicator'
  //               size={24}
  //               color={colorScheme === 'dark' ? 'white' : 'black'}
  //             />
  //           </View>
  //           <Text style={tw`text-black text-lg font-bold text-center`}>{item.description}</Text>
  //         </TouchableOpacity>
  //       </View>
  //     </ScaleDecorator>
  //   )
  // }

  const renderItem = ({ item, drag, isActive }: RenderItemParams<Item>) => {
    console.log('item', item)
    console.log('data', data)
    return (
      <ScaleDecorator>
        <TouchableOpacity
          onLongPress={drag}
          disabled={isActive}
          style={[
            tw`flex-row w-4/5 rounded-lg mb-6 items-center`,
            { backgroundColor: isActive ? 'red' : 'white' },
          ]}>
          <Text style={tw`text-black text-lg font-bold text-center`}>{item.description}</Text>
        </TouchableOpacity>
      </ScaleDecorator>
    )
  }

  return (
    <View style={[tw`flex-1`, colorScheme === 'dark' ? tw`bg-neutral-800` : tw`bg-slate-100`]}>
      <DrawerToggle />

      {/* <FlatList data={data} renderItem={renderItem} /> */}

      <DraggableFlatList
        data={data}
        onDragEnd={({ data }) => setData(data)}
        keyExtractor={(item) => item.key}
        renderItem={renderItem}
      />
      {/* <View style={tw`flex-1 justify-center items-center top-35`}>
        <Text style={[tw`opacity-50`, colorScheme === 'dark' ? tw`text-white` : tw`text-black`]}>
          test
        </Text>
      </View> */}
      {(stylized as boolean) ? (
        <ScrollView style={tw`px-6 mt-4`}>
          {taskList.map((taskList, index) => {
            return (
              <View key={index}>
                <TouchableOpacity onPress={() => editTask(index)} style={tw`justify-between`}>
                  <LinearGradient
                    colors={getColor(index)}
                    style={tw`p-2 flex-row rounded-lg mb-4 items-center`}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}>
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
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            )
          })}
        </ScrollView>
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
        style={tw`bottom-4`}>
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
