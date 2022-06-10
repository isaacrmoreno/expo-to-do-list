import React from 'react'
import tw from 'twrnc'
import { TouchableOpacity, Text } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { SignUpButtonProps } from '../types/index'

const SignUpButton: React.FC<SignUpButtonProps> = ({
  name,
  authType,
  size,
  color,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={tw`flex-row w-full bg-white p-4 rounded-full items-center mb-4`}
      onPress={onPress}>
      <AntDesign style={tw`absolute left-6`} name={name} size={size} color={color} />
      <Text style={tw`flex-1 text-center`}>Continue with {authType}</Text>
    </TouchableOpacity>
  )
}

export default SignUpButton
