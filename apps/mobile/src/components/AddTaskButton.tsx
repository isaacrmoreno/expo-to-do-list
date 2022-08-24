import React from 'react'
import tw from 'twrnc'
import { useColorScheme } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { addTaskButtonProps } from '../types/index'

const AddTaskButton = (props: addTaskButtonProps) => {
  const { name, onPress } = props
  const colorScheme = useColorScheme()

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        tw`w-14 h-14 bg-white items-center justify-center border rounded-full`,
        colorScheme === 'dark' && tw`bg-neutral-700 border-white`,
      ]}>
      <Feather name={name} size={30} color={colorScheme === 'dark' ? 'white' : 'black'} />
    </TouchableOpacity>
  )
}

export default AddTaskButton
