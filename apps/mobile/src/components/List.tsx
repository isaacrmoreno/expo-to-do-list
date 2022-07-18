import React from 'react'
import tw from 'twrnc'
import { TouchableOpacity, Text, useColorScheme, ScrollView, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import useStore from '../store/index'

const List = () => {
  const allList = useStore((state) => state?.allList)
  const setListName = useStore((state) => state?.setListName)

  const colorScheme = useColorScheme()

  const removeList = async (index: number) => {
    try {
      let UpdatedList = [...allList]
      UpdatedList.splice(index, 1)
      setListName(UpdatedList)
      await AsyncStorage.setItem('@allList', JSON.stringify(UpdatedList))
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <ScrollView style={tw`mt-26`}>
      {allList.flat().map((listName: string, index: number) => (
        <View key={index}>
          <TouchableOpacity
            onLongPress={() => removeList(index)}
            style={[
              tw`h-10 w-60 bg-white justify-center border rounded-lg mb-2`,
              colorScheme === 'dark' && tw`bg-neutral-700 border-white`,
            ]}>
            <Text style={[tw`pl-2`, colorScheme === 'dark' ? tw`text-white` : tw`text-black`]}>
              {listName}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  )
}

export default List
