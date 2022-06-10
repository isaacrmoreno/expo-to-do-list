import React from 'react'
import tw from 'twrnc'
import { Text, TouchableOpacity, useColorScheme } from 'react-native'
import { LoginSignUpButtonProps } from '../types/index'

const LoginSignUpButton: React.FC<LoginSignUpButtonProps> = ({ onPress, text }) => {
  const colorScheme = useColorScheme()

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        tw`p-2 flex-row w-full rounded-full mb-2`,
        colorScheme === 'dark' ? tw`bg-neutral-700` : tw`bg-white`,
      ]}>
      <Text
        style={[
          tw`flex-1 text-lg font-bold text-center`,
          colorScheme === 'dark' ? tw`text-white` : tw`text-black`,
        ]}>
        {text}
      </Text>
    </TouchableOpacity>
  )
}

export default LoginSignUpButton
