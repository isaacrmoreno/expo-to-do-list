import React, { useState } from 'react'
import tw from 'twrnc'
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
  TextInput,
  Keyboard,
  Alert,
  ScrollView,
  StatusBar,
} from 'react-native'

import TaskItem from '../components/TaskItem'
import AddTaskButton from '../components/AddTaskButton'

export default function TaskScreen() {
  const [task, setTask] = useState<string | null>('')
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [taskItems, setTaskItems] = useState<Array<string | null>>([])
  const [updateIcon, setUpdateIcon] = useState<Boolean>(false)

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
    <View style={tw`flex-1 relative bg-slate-100`}>
      <View
        style={tw`px-5`}
        // this view is the view that hides the taskItems after they reach a certain length.
      >
        <ScrollView style={tw`px-5 mt-8`}>
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
      </View>
      <KeyboardAvoidingView
        behavior='position'
        // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={tw`mb-8 items-center absolute px-5 bottom-12 w-full flex-row justify-around`}>
        <TextInput
          style={tw`p-4 bg-white rounded-full border w-full`}
          placeholder={'Write a task'}
          value={task}
          onChangeText={(text) => setTask(text)}
        />
        {updateIcon ? (
          <AddTaskButton
            name='check'
            size={24}
            color='black'
            onPress={handleUpdateTask}
          />
        ) : (
          <AddTaskButton name='plus' size={24} color='black' onPress={handleAddTask} />
        )}
      </KeyboardAvoidingView>
    </View>
  )
}
