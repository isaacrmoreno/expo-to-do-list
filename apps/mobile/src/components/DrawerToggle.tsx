import React, { useState, useEffect } from 'react'
import tw from 'twrnc'
import { Keyboard, useColorScheme, View, TouchableOpacity, Text } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Dialog from 'react-native-dialog'
import useStore from '../store/index'

const DrawerToggle = () => {
  const [listName, setListName] = useState<string>('')
  const dialog = useStore((state) => state?.dialog)
  const setDialog = useStore((state) => state?.setDialog)
  const addListName = useStore((state) => state.addListName)
  const allList = useStore((state) => state?.allList)

  const colorScheme = useColorScheme()
  const navigation = useNavigation<any>()

  const toggleDrawer = () => {
    navigation.toggleDrawer()
    Keyboard.dismiss()
  }

  const addNewList = async () => {
    try {
      setDialog(!dialog)
      addListName(listName)
      allList.push(listName)
      setListName('')
      const jsonValue = JSON.stringify(allList.flat())
      console.log('jsonValue', jsonValue)
      await AsyncStorage.setItem('@allList', jsonValue)
    } catch (e) {
      console.log(e)
    }
  }

  // const arr1 = [['hey','you'],'there']
  // console.log(arr1.flat())
  // > Array ["hey", "you", "there"]

  // so when I refresh, the value async storage is getting, is an array that holds my first two values, then add the third new value, jsonValue [["One","Two"],"Three"]
  // I just need one array with all the values.
  // I blame addListName. This can become a recursive mess, so dont always create a new array when pushing.

  const getAllListNames = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@allList')
      // jsonValue !== null && addListName(JSON.parse(jsonValue))
      if (jsonValue !== null) {
        const parsedList = JSON.parse(jsonValue)
        const recursiveList = parsedList.flat()
        addListName(recursiveList)
      }
    } catch (e) {
      console.log(e)
    }
  }

  const removeValue = async () => {
    await AsyncStorage.removeItem('@allList')
  }

  useEffect(() => {
    getAllListNames()
  }, [])

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
      <TouchableOpacity onPress={removeValue}>
        <Text>RESET</Text>
      </TouchableOpacity>
    </View>
  )
}

export default DrawerToggle
