import React from 'react'
import tw from 'twrnc'
import { TouchableOpacity, Text, useColorScheme } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { ContinueWithButtonProps } from '../types/index'

const ContinueWithButton: React.FC<ContinueWithButtonProps> = ({
  name,
  authType,
  size,
  onPress,
}) => {
  const colorScheme = useColorScheme()
  return (
    <TouchableOpacity
      style={[
        tw`flex-row w-full p-4 rounded-full items-center mb-4`,
        colorScheme === 'dark' ? tw`bg-neutral-700` : tw`bg-white`,
      ]}
      onPress={onPress}>
      <AntDesign
        style={tw`absolute left-6`}
        name={name}
        size={size}
        color={colorScheme === 'dark' ? 'white' : 'black'}
      />
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

export default ContinueWithButton
