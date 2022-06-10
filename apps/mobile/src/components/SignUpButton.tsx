import React from 'react'
import tw from 'twrnc'
import { TouchableOpacity, Text, useColorScheme } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { SignUpButtonProps } from '../types/index'

const SignUpButton: React.FC<SignUpButtonProps> = ({
  name,
  authType,
  size,
  color,
  onPress,
}) => {
  const colorScheme = useColorScheme()
  return (
    <TouchableOpacity
      style={[
        tw`flex-row w-full p-4 rounded-full items-center mb-4`,
        colorScheme === 'dark' ? tw`bg-gray-600` : tw`bg-white`,
      ]}
      onPress={onPress}>
      <AntDesign style={tw`absolute left-6`} name={name} size={size} color={color} />
      <Text
        style={[
          tw`flex-1 text-center`,
          colorScheme === 'dark' ? tw`text-white` : tw`text-black`,
        ]}>
        Continue with {authType}
      </Text>
    </TouchableOpacity>
  )
}

export default SignUpButton
