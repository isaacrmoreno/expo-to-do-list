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
  const { setTaskList, taskList } = props
  const [listName, setListName] = useState<string>('')
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

  // lets write about this for a little. all list currently holds the list names.
  // the first few task likely wont have a list associated with them to begin with.
  // I can just leave this value empty as Null.
  // when a user fills out the first form, it will push this new value where null currently resides under listName.
  // I will remove all list from displaying on screen. HOW? I will then filter by null?
  // then when they click the listName on the side it will filter by that name.
  // if listName is !== null. Then we can display pencil Icon for editing name?
  // no no this work flow isn't great.

  // all list

  const addNewList = async () => {
    setDialog(!dialog)
    allList.push(listName)
    // console.log('taskList', taskList)
    // Object.keys(taskList), // Array ["0","1","2"]

    // Object.keys(taskList).forEach((key) => {
    //   taskList[key] = listName
    //   return taskList
    // })
    // setTaskList() // turns all key value pairs to listName or blank.

    // updatedTaskList = taskList.map((taskList) => {

    // })

    // let updateName = taskList.filter((taskList) => taskList?.name === null) // returns stuff.
    // console.log(updateName)

    // taskList.forEach(taskList?.name === null) {
    // 	taskList?.name = listName
    // 	return taskList
    // }

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

  return (
    <View style={tw`flex-row mt-14 mx-6 justify-between items-center`}>
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
