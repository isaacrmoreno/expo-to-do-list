import React from 'react'
import tw from 'twrnc'
import { TouchableOpacity, Text, useColorScheme, ScrollView, View } from 'react-native'
import useStore from '../store/index'

const List: React.FC = () => {
  const colorScheme = useColorScheme()

  const allList = useStore((state) => state.allList)

  return (
    <ScrollView style={tw`mt-26`}>
      <View key={null}>
        {allList.map((listName: string) => (
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
        ))}
      </View>
    </ScrollView>
  )
}

export default List
