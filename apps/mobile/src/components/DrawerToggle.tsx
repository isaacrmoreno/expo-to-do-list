import React from 'react'
import tw from 'twrnc'
import { Keyboard, useColorScheme, View } from 'react-native'
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
    <TouchableOpacity onPress={toggleDrawer} style={tw`mt-14 left-5`}>
      {colorScheme === 'dark' ? (
        <Entypo name='menu' size={30} color='white' />
      ) : (
        <Entypo name='menu' size={30} color='black' />
      )}
    </TouchableOpacity>
  )
}

export default DrawerToggle
