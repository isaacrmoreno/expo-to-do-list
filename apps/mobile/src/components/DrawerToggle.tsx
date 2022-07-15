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
  const [allList, setAllList] = useState<[]>([])

  const colorScheme = useColorScheme()

  const navigation = useNavigation<any>()

  const toggleDrawer = () => {
    navigation.toggleDrawer()
    Keyboard.dismiss()
  }

  const addNewList = () => {
    const newList = allList.push(listName)
    console.log(newList)
    setAllList(newList)
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
        <Dialog.Title>Create New List</Dialog.Title>
        <Dialog.Description>Name New List 📝</Dialog.Description>
        <Dialog.Input value={listName} onChangeText={(text) => setListName(text)}></Dialog.Input>
        <Dialog.Button label='Cancel' onPress={() => setDialog(!dialog)} />
        <Dialog.Button label='Create' onPress={addNewList} />
      </Dialog.Container>
      {/* {console.log('listName', listName)}
      <Text>listName: {allList}</Text> */}
    </View>
  )
}

export default DrawerToggle
