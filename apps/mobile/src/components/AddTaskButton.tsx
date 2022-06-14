import React from 'react'
import tw from 'twrnc'
import { useColorScheme } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { addTaskButtonProps } from '../types/index'

<<<<<<< HEAD
const AddTaskButton: React.FC<addTaskButtonProps> = ({ name, size, onPress, isDisabled }) => {
=======
const AddTaskButton: React.FC<addTaskButtonProps> = ({ name, size, onPress }) => {
>>>>>>> development
  const colorScheme = useColorScheme()

  return (
    <TouchableOpacity
      onPress={onPress}
<<<<<<< HEAD
      disabled={isDisabled}
      style={[
        tw`w-14 h-14 bg-white items-center justify-center border rounded-full`,
        colorScheme === 'dark' && tw`bg-neutral-700`,
        isDisabled && tw`opacity-50`,
=======
      style={[
        tw`w-14 h-14 bg-white items-center justify-center border rounded-full`,
        colorScheme === 'dark' && tw`bg-neutral-700`,
>>>>>>> development
      ]}>
      <AntDesign name={name} size={size} color={colorScheme === 'dark' ? 'white' : 'black'} />
    </TouchableOpacity>
  )
}

export default AddTaskButton
