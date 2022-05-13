import React from 'react'
import tw from 'twrnc'
import { Image } from 'react-native'
import logo from '../../assets/icon.png'

const Logo = () => {
  return <Image source={logo} style={tw`absolute w-20 h-20 top-35 rounded-full`} />
}

export default Logo
