import React from 'react'
import tw from 'twrnc'
import { Text, View } from 'react-native'
import { HeaderProps } from '../types/index'

const Header: React.FC<HeaderProps> = ({ ScreenTitle }) => {
  return (
    <View style={tw`flex-1`}>
      <Text style={tw`top-14 font-bold text-2xl`}>{ScreenTitle}</Text>
    </View>
  )
}

export default Header
