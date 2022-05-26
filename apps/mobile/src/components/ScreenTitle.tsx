import React from 'react'
import tw from 'twrnc'
import { useColorScheme } from 'react-native'
import { Text, View } from 'react-native'
import { ScreenTitleProps } from '../types/index'

const ScreenTitle: React.FC<ScreenTitleProps> = ({ title }) => {
  const colorScheme = useColorScheme()
  return (
    <View style={tw`flex-1`}>
      <Text
        style={[
          tw`top-14 font-bold text-2xl`,
          colorScheme === 'dark' ? tw`text-white` : tw`text-black`,
        ]}>
        {title}
      </Text>
    </View>
  )
}

export default ScreenTitle
