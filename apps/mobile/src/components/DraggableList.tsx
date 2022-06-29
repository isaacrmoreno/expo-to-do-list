import React, { useState } from 'react'
import tw from 'twrnc'
import { Text, View, TouchableOpacity, useColorScheme } from 'react-native'
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from 'react-native-draggable-flatlist'
import { MaterialIcons } from '@expo/vector-icons'
import { Feather } from '@expo/vector-icons'

let listItem = [{ description: 'This' }, { description: 'Is' }, { description: 'A test' }]

type Item = {
  key: string
  label: string
}

const testData: Item[] = [...Array(listItem?.length)].map((d, index) => {
  return {
    key: `item-${index}`,
    label: listItem[index]?.description,
  }
})

const DraggableList = () => {
  const [data, setData] = useState(testData)

  const colorScheme = useColorScheme()

  console.log('data:', data)

  const renderItem = ({ item, drag, isActive }: RenderItemParams<Item>) => {
    return (
      <ScaleDecorator>
        <View style={tw`items-center`}>
          <TouchableOpacity
            onLongPress={drag}
            disabled={isActive}
            style={[
              tw`flex-row w-4/5 rounded-lg mb-6 items-center`,
              { backgroundColor: isActive ? 'red' : 'white' },
            ]}>
            <View>
              <MaterialIcons name='drag-indicator' size={24} color='black' />
            </View>
            <Text style={tw`text-black text-lg font-bold text-center`}>{item.label}</Text>
            <Feather
              name='trash-2'
              size={24}
              color={colorScheme === 'dark' ? 'white' : 'black'}
              onPress={() => confirmDeleteAlert(index)}
            />
          </TouchableOpacity>
        </View>
      </ScaleDecorator>
    )
  }

  return (
    <DraggableFlatList
      data={data}
      onDragEnd={({ data }) => setData(data)}
      keyExtractor={(item) => item.key}
      renderItem={renderItem}
    />
  )
}

export default DraggableList
