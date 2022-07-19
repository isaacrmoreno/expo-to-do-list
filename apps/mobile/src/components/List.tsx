import React from 'react'
import tw from 'twrnc'
import { TouchableOpacity, Text, useColorScheme, ScrollView, View, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import useStore from '../store/index'
import { Feather } from '@expo/vector-icons'
import { truncate } from '../utils/index'

const List = () => {
  const allList = useStore((state) => state?.allList)
  const setAllList = useStore((state) => state?.setAllList)

  const colorScheme = useColorScheme()

  const removeList = async (index: number) => {
    try {
      let UpdatedList = [...allList]
      UpdatedList.splice(index, 1)
      setAllList(UpdatedList)
      await AsyncStorage.setItem('@allList', JSON.stringify(UpdatedList))
    } catch (e) {
      console.log(e)
    }
  }

  const confirmDeleteAlert = (index: number) =>
    Alert.alert('Delete List?', 'Are you sure you want to delete this list?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      { text: 'Delete', onPress: () => removeList(index), style: 'destructive' },
    ])

  return (
    <ScrollView style={tw`mt-26`}>
      {allList.map((listName: string, index: number) => (
        <View key={index}>
          <TouchableOpacity
            style={[
              tw`flex-row h-10 w-60 bg-white items-center border rounded-lg mb-2 justify-between`,
              colorScheme === 'dark' && tw`bg-neutral-700 border-white`,
            ]}>
            <Text style={[tw`pl-2`, colorScheme === 'dark' ? tw`text-white` : tw`text-black`]}>
              {truncate(listName)}
            </Text>
            <Feather
              name='trash-2'
              size={24}
              color={colorScheme === 'dark' ? 'white' : 'black'}
              onPress={() => confirmDeleteAlert(index)}
              style={tw`pr-2`}
            />
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  )
}

export default List
