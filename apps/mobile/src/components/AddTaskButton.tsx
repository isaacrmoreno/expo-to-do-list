import React from 'react'
import tw from 'twrnc'
import { useColorScheme } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { addTaskButtonProps } from '../types/index'

const AddTaskButton: React.FC<addTaskButtonProps> = ({ name, size, onPress }) => {
  const colorScheme = useColorScheme()

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        tw`w-14 h-14 bg-white items-center justify-center border rounded-full`,
        colorScheme === 'dark' && tw`bg-neutral-700 border-white`,
      ]}>
      <AntDesign name={name} size={size} color={colorScheme === 'dark' ? 'white' : 'black'} />
    </TouchableOpacity>
  )
}

export default AddTaskButton
