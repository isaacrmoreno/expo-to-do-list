import React from 'react'
import tw from 'twrnc'
import { View, Text } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { TaskItemProps } from '../types/index'

const TaskItem: React.FC<TaskItemProps> = ({
  index,
  text,
  confirmDeleteAlert,
  editTask,
}) => {
  return (
    <View style={tw`bg-white p-4 rounded-lg flex-row items-center justify-between mb-6`}>
      <View style={tw`flex-row items-center`}>
        <Feather
          style={tw`mr-2`}
          name='edit'
          size={24}
          color='black'
          onPress={() => editTask(index)}
        />
        <Text style={tw`max-w-58`}>{text}</Text>
      </View>
      <Feather
        name='trash-2'
        size={24}
        color='black'
        onPress={() => confirmDeleteAlert(index)}
      />
    </View>
  )
}

export default TaskItem
