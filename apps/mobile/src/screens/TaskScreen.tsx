import React, { useState } from 'react'
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
  const [task, setTask] = useState<string | null>('')
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [taskItems, setTaskItems] = useState<Array<string | null>>([])
  const [updateIcon, setUpdateIcon] = useState<Boolean>(false)

  const colorScheme = useColorScheme()

  const handleAddTask = () => {
    Keyboard.dismiss()
    setTaskItems([...taskItems, task])
    setTask(null)
  }

  const editTask = (index: number) => {
    setUpdateIcon(true)
    const newTask = taskItems[index]
    setTask(newTask)
    setCurrentIndex(index)
  }

  const handleUpdateTask = () => {
    setUpdateIcon(false)
    Keyboard.dismiss()
    let taskItemsCopy = [...taskItems]
    taskItemsCopy.splice(currentIndex, 1, task)
    setTaskItems(taskItemsCopy)
    setTask(null)
  }

  const completeTask = (index: number) => {
    let itemsCopy = [...taskItems]
    itemsCopy.splice(index, 1)
    setTaskItems(itemsCopy)
  }

  const confirmDeleteAlert = (index: number) =>
    Alert.alert('Delete Task?', 'Are you sure you want to delete this task?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      { text: 'Delete', onPress: () => completeTask(index), style: 'destructive' },
    ])

  return (
    <View
      style={[
        tw`flex-1`,
        colorScheme === 'dark' ? tw`bg-neutral-800` : tw`bg-slate-100`,
      ]}>
      <DrawerToggle />
      <ScrollView style={tw`px-5 mt-4`}>
        {taskItems.map((item, index) => {
          return (
            <View key={index}>
              <TaskItem
                text={item}
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
            placeholder={'Write a task'}
            value={task}
            onChangeText={(text) => setTask(text)}
          />
          {updateIcon ? (
            <AddTaskButton name='check' size={24} onPress={handleUpdateTask} />
          ) : (
            <AddTaskButton name='plus' size={24} onPress={handleAddTask} />
          )}
        </View>
      </KeyboardAvoidingView>
    </View>
  )
}
