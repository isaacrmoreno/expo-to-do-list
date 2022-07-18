import React from 'react'
import tw from 'twrnc'
import { TouchableOpacity, Text, useColorScheme, ScrollView, View } from 'react-native'
import useStore from '../store/index'

const List = () => {
  const allList = useStore((state) => state?.allList)

  const colorScheme = useColorScheme()

  return (
    <ScrollView style={tw`mt-26`}>
      {allList.map((listName: string, index: number) => (
        <View key={index}>
          <TouchableOpacity
            key={listName}
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
