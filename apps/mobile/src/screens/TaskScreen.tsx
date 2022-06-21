import React, { useEffect, useRef, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import tw from 'twrnc'
import {
  KeyboardAvoidingView,
  View,
  TextInput,
  Keyboard,
  Alert,
  ScrollView,
  useColorScheme,
  TouchableOpacity,
  Text,
  Platform,
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import * as ScreenOrientation from 'expo-screen-orientation'

import AddTaskButton from '../components/AddTaskButton'
import DrawerToggle from '../components/DrawerToggle'

export default function TaskScreen() {
  const [task, setTask] = useState<string>('')
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [taskList, setTaskList] = useState<object[]>([
    {
      description: 'Thanks so much for downloading Quail! Heres to keeping it simple. Cheers! 🐦 ',
    },
  ])

  const [updateIcon, setUpdateIcon] = useState<boolean>(false)
  const [isDisabled, setIsDisabled] = useState<boolean>(true)

  const inputRef = useRef('')

  const colorScheme = useColorScheme()

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

  async function changeScreenOrientation() {
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

  const confirmDeleteAlert = (index: number) =>
    Alert.alert('Delete Task?', 'Are you sure you want to delete this task?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      { text: 'Delete', onPress: () => completeTask(index), style: 'destructive' },
    ])

  return (
    <View style={[tw`flex-1`, colorScheme === 'dark' ? tw`bg-neutral-800` : tw`bg-slate-100`]}>
      <DrawerToggle />
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
                <Feather
                  name='trash-2'
                  size={24}
                  color={colorScheme === 'dark' ? 'white' : 'black'}
                  onPress={() => confirmDeleteAlert(index)}
                />
              </TouchableOpacity>
            </View>
          )
        })}
      </ScrollView>
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
            <AddTaskButton name='check' size={24} onPress={handleUpdateTask} />
          ) : (
            <AddTaskButton name='plus' size={24} onPress={handleAddTask} />
          )}
        </View>
      </KeyboardAvoidingView>
    </View>
  )
}
