import React, { useState } from 'react'
import tw from 'twrnc'
import { Keyboard, useColorScheme } from 'react-native'
import { View, TouchableOpacity, Text } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import Dialog from 'react-native-dialog'
import useStore from '../store/index'

const DrawerToggle = () => {
  const dialog = useStore((state) => state?.dialog)
  const setDialog = useStore((state) => state?.setDialog)

  const [listName, setListName] = useState<string>('')

  const colorScheme = useColorScheme()

  const navigation = useNavigation<any>()

  const toggleDrawer = () => {
    navigation.toggleDrawer()
    Keyboard.dismiss()
  }

  const addListName = useStore((state) => state.addListName)

  const addNewList = () => {
    addListName(listName)
    setDialog(!dialog)
    setListName('')
  }

  return (
    <View style={tw`flex-row mt-14 mx-6 justify-between`}>
      <TouchableOpacity onPress={toggleDrawer}>
        <Entypo name='menu' size={30} color={colorScheme === 'dark' ? 'white' : 'black'} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setDialog(!dialog)}>
        <Entypo
          name='circle-with-plus'
          size={30}
          color={colorScheme === 'dark' ? 'white' : 'black'}
        />
      </TouchableOpacity>
      <Dialog.Container visible={dialog} onBackdropPress={() => setDialog(!dialog)}>
        <Dialog.Title>Group Current List</Dialog.Title>
        <Dialog.Description>Name New Group 📝</Dialog.Description>
        <Dialog.Input value={listName} onChangeText={(text) => setListName(text)}></Dialog.Input>
        <Dialog.Button
          label='Cancel'
          onPress={() => {
            setDialog(!dialog)
            setListName('')
          }}
        />
        <Dialog.Button label='Create' onPress={addNewList} />
      </Dialog.Container>
    </View>
  )
}

export default DrawerToggle
