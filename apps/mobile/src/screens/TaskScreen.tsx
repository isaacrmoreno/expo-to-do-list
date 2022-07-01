import React, { useEffect, useRef, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import tw from 'twrnc'
import {
  KeyboardAvoidingView,
  View,
  TextInput,
  Keyboard,
  // Alert,
  ScrollView,
  useColorScheme,
  TouchableOpacity,
  Text,
  Platform,
} from 'react-native'
import { EvilIcons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import * as ScreenOrientation from 'expo-screen-orientation'

import AddTaskButton from '../components/AddTaskButton'
import DrawerToggle from '../components/DrawerToggle'

export default function TaskScreen() {
  const [task, setTask] = useState<string>('')
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [taskList, setTaskList] = useState<object[]>([])

  const [updateIcon, setUpdateIcon] = useState<boolean>(false)
  const [isDisabled, setIsDisabled] = useState<boolean>(true)
  const [stylize, setIsStylized] = useState<boolean>(true)

  const inputRef = useRef('')
  const colorScheme = useColorScheme()

  const NUM_ITEMS = 10
  function getColor(i: number) {
    const multiplier = 255 / (NUM_ITEMS - 1)
    const colorVal = i * multiplier
    return `rgb(${colorVal}, ${Math.abs(128 - colorVal)}, ${255 - colorVal})`
  }

  type Item = {
    key: string
    label: string
    height: number
    width: number
    backgroundColor: string
  }

  const initialData: Item[] = [...Array(NUM_ITEMS)].map((d, index) => {
    const backgroundColor = getColor(index)
    return {
      key: `item-${index}`,
      label: String(index) + '',
      height: 100,
      width: 60 + Math.random() * 40,
      backgroundColor,
    }
  })

  const handleAddTask = async () => {
    try {
      Keyboard.dismiss()
      setTaskList([...taskList, { description: task }])
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

  // const confirmDeleteAlert = (index: number) =>
  //   Alert.alert('Delete Task?', 'Are you sure you want to delete this task?', [
  //     {
  //       text: 'Cancel',
  //       style: 'cancel',
  //     },
  //     { text: 'Delete', onPress: () => completeTask(index), style: 'destructive' },
  //   ])

  {
    /* <LinearGradient
		colors={['#f6d365', '#fda085']} // #f093fb #f5576c //  #5ee7df #b490ca //  #c3cfe2 #c3cfe2
		start={{ x: 0, y: 0 }}
		end={{ x: 1, y: 0 }}>
	</LinearGradient> */
  }

  return (
    <View style={[tw`flex-1`, colorScheme === 'dark' ? tw`bg-neutral-800` : tw`bg-slate-100`]}>
      <DrawerToggle />
      {(stylize as boolean) ? (
        <ScrollView style={tw`px-5 mt-4`}>
          {taskList.map((taskList, index) => {
            return (
              <View key={index}>
                <TouchableOpacity onPress={() => editTask(index)} style={tw`justify-between`}>
                  <LinearGradient
                    colors={['#f6d365', '#fda085']} // #f093fb #f5576c //  #5ee7df #b490ca //  #c3cfe2 #c3cfe2
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
                      size={35}
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
        <ScrollView style={tw`px-5 mt-4`}>
          {taskList.map((taskList, index) => {
            return (
              <View key={index}>
                <TouchableOpacity
                  onPress={() => editTask(index)}
                  style={[
                    tw`bg-white p-4 rounded-lg flex-row items-center justify-between mb-6`,
                    colorScheme === 'dark' && tw`bg-neutral-700`,
                  ]}>
                  <Text
                    style={[tw`w-11/12`, colorScheme === 'dark' ? tw`text-white` : tw`text-black`]}>
                    {taskList?.description}
                  </Text>
                  <EvilIcons
                    name='check'
                    size={35}
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
