import React, { useState, useEffect } from 'react'
import tw from 'twrnc'
import { Keyboard, useColorScheme, View, TouchableOpacity } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Dialog from 'react-native-dialog'
import useStore from '../store/index'
import { DrawerToggleProps } from '../types/index'

const DrawerToggle: React.FC<DrawerToggleProps> = (props) => {
  const { taskList } = props
  const [listName, setListName] = useState<string>('')
  const [disableListIcon, setDisableListIcon] = useState<boolean>(false)
  const dialog = useStore((state) => state?.dialog)
  const setDialog = useStore((state) => state?.setDialog)
  const setAllList = useStore((state) => state?.setAllList)
  const allList = useStore((state) => state?.allList)

  const colorScheme = useColorScheme()
  const navigation = useNavigation<any>()

  const toggleDrawer = () => {
    navigation.toggleDrawer()
    Keyboard.dismiss()
  }

  const addNewList = async () => {
    setDialog(!dialog)
    allList.push(listName)
    setAllList(allList)
    setListName('')
    const jsonValue = JSON.stringify(allList)
    await AsyncStorage.setItem('@allList', jsonValue)
  }

  const getAllListNames = async () => {
    const jsonValue = await AsyncStorage.getItem('@allList')
    jsonValue !== null && setAllList(JSON.parse(jsonValue))
  }

  useEffect(() => {
    getAllListNames()
  }, [])

  useEffect(() => {
    taskList?.length === 0 ? setDisableListIcon(true) : setDisableListIcon(false)
  })

  return (
    <View style={tw`flex-row mt-14 mx-6 justify-between items-center`}>
      <TouchableOpacity onPress={toggleDrawer}>
        <Entypo name='menu' size={30} color={colorScheme === 'dark' ? 'white' : 'black'} />
      </TouchableOpacity>
      <TouchableOpacity
        disabled={disableListIcon}
        onPress={() => setDialog(!dialog)}
        style={(disableListIcon as boolean) ? tw`opacity-50` : null}>
        <Entypo
          name='circle-with-plus'
          size={30}
          color={colorScheme === 'dark' ? 'white' : 'black'}
        />
      </TouchableOpacity>
      <Dialog.Container
        visible={dialog}
        onBackdropPress={() => {
          setDialog(!dialog)
          setListName('')
        }}>
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
