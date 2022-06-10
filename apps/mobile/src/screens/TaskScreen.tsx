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
} from 'react-native'

import TaskItem from '../components/TaskItem'
import AddTaskButton from '../components/AddTaskButton'
import DrawerToggle from '../components/DrawerToggle'

export default function TaskScreen() {
  const [task, setTask] = useState<string>('')
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  // const [taskList, setTaskList] = useState<Array<string | null>>([]) // original
  const [taskList, setTaskList] = useState<object[]>([{ description: '' }])
  const [updateIcon, setUpdateIcon] = useState<boolean>(false)
  const [isDisabled, setIsDisabled] = useState<boolean>(true)

  const inputRef = useRef(null)

  const colorScheme = useColorScheme()

  // const handleAddTask = () => {
  //   Keyboard.dismiss()
  //   setTaskList([...taskList, task])
  //   setTask('')
  // }

  const handleAddTask = async () => {
    try {
      Keyboard.dismiss()
      setTaskList([...taskList, { description: task }])
      setTask('')
      taskList.shift()
      taskList.push({ description: task })
      const jsonValue = JSON.stringify(taskList)
      await AsyncStorage.setItem('@taskList', jsonValue)
      console.log('jsonValue:', jsonValue)
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
    const newTask = taskList[index]
    setTask(newTask)
    setCurrentIndex(index)
  }

  // const handleUpdateTask = () => {
  //   setUpdateIcon(false)
  //   Keyboard.dismiss()
  //   let taskListCopy = [...taskList]
  //   taskListCopy.splice(currentIndex, 1, task)
  //   setTaskList(taskListCopy)
  //   setTask('')
  // }

  const handleUpdateTask = async () => {
    try {
      setUpdateIcon(false)
      Keyboard.dismiss()
      let updatedTaskList = [...taskList]
      updatedTaskList.splice(currentIndex, 1, task)
      setTaskList(updatedTaskList)
      setTask('')
      const jsonValue = JSON.stringify(updatedTaskList)

      // setTaskList([...taskList, { description: text }])
      // taskList.shift()
      // taskList.push({ description: text })

      // const jsonValue = JSON.stringify(taskList)
      await AsyncStorage.setItem('@taskList', jsonValue)
    } catch (e) {
      console.log(e)
    }
  }

  // const completeTask = (index: number) => {
  //   let itemsCopy = [...taskList]
  //   itemsCopy.splice(index, 1)
  //   setTaskList(itemsCopy)
  //   setUpdateIcon(false)
  // }

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

  useEffect(() => {
    task?.length !== 0 ? setIsDisabled(false) : setIsDisabled(true)
  }, [task])

  useEffect(() => {
    getTaskList()
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
              <TaskItem
                text={taskList}
                index={index}
                confirmDeleteAlert={confirmDeleteAlert}
                editTask={editTask}
              />
            </View>
          )
        })}
      </ScrollView>
      <KeyboardAvoidingView behavior='position' style={tw`bottom-4`}>
        <View style={tw`flex-row justify-between px-5`}>
          <TextInput
            style={[
              tw`p-4 mb-4 bg-white rounded-full border w-4/5`,
              colorScheme === 'dark' && tw`bg-neutral-700 text-white`,
            ]}
            ref={inputRef}
            // value={task}
            placeholder={'Write a task'}
            clearButtonMode='while-editing'
            onChangeText={(text) => setTask(text)}
          />
          {updateIcon ? (
            <AddTaskButton
              name='check'
              size={24}
              onPress={handleUpdateTask}
              isDisabled={isDisabled}
            />
          ) : (
            <AddTaskButton name='plus' size={24} onPress={handleAddTask} isDisabled={isDisabled} />
          )}
        </View>
      </KeyboardAvoidingView>
    </View>
  )
}
