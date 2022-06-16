import React from 'react'
import tw from 'twrnc'
import { Keyboard, useColorScheme } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const DrawerToggle = () => {
  const colorScheme = useColorScheme()

  const navigation = useNavigation<any>()

  const toggleDrawer = () => {
    navigation.toggleDrawer()
    Keyboard.dismiss()
  }

  return (
    <TouchableOpacity onPress={toggleDrawer} style={tw`mt-14 left-5 w-8`}>
      <Entypo name='menu' size={30} color={colorScheme === 'dark' ? 'white' : 'black'} />
    </TouchableOpacity>
  )
}

export default DrawerToggle
