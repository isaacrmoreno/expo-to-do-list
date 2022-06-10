import React from 'react'
import tw from 'twrnc'
import { TouchableOpacity, useColorScheme } from 'react-native'
import { View, Text } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { TaskItemProps } from '../types/index'

const TaskItem: React.FC<TaskItemProps> = (props) => {
  const { index, confirmDeleteAlert, editTask, taskList } = props
  const colorScheme = useColorScheme()
  return (
    <TouchableOpacity
      onPress={() => editTask(index)}
      style={[
        tw`bg-white p-4 rounded-lg flex-row items-center justify-between mb-6`,
        colorScheme === 'dark' && tw`bg-neutral-700`,
      ]}>
      <View style={tw`flex-row items-center`}>
        <Text style={[tw`max-w-58`, colorScheme === 'dark' && tw`text-white`]}>
          {taskList?.description}
        </Text>
      </View>
      <Feather
        name='trash-2'
        size={24}
        color={colorScheme === 'dark' ? 'white' : 'black'}
        onPress={() => confirmDeleteAlert(index)}
      />
    </TouchableOpacity>
  )
}

export default TaskItem
