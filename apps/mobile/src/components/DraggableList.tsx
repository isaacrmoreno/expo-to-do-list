import React, { useState } from 'react'
import tw from 'twrnc'
import { Text, View, TouchableOpacity } from 'react-native'
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from 'react-native-draggable-flatlist'
import { MaterialIcons } from '@expo/vector-icons'

let listItem = [{ description: 'This' }, { description: 'Is' }, { description: 'A test' }]

const NUM_ITEMS = 5

const WORD_TEST = 'Lorem ipsum dolor sit'.split(' ') // ["Lorem", "ipsum", "dolor", "sit"]

const ARRAY_TEST = ['this', 'is', 'a test']

type Item = {
  key: string
  label: string
}

const initialData: Item[] = [...Array(NUM_ITEMS)].map((d, index) => {
  return {
    key: `item-${index}`,
    label: String(index),
  }
})

const testData: Item[] = [...Array(listItem)].map((d, index) => {
  return {
    key: `item-${index}`, // [{ "key": "item-0", "label": "This"}]
    // key: listItem[index], // [{ "key": { "description": "This"}, "label": "This"}]
    // key: listItem[index],
    // label: String(listItem?.description), // undefined
    // label: String(listItem[0]?.description), // this
    // label: listItem[0]?.description, // this
    label: listItem[index]?.description, // this
  }
})

// const wordData: Item[] = [...Array(WORD_TEST)].map((d, index) => {
//   return {
//     key: `item-${index}`,
//     label: String(WORD_TEST), // Lorem,ipsum,dolor,sit
//     // label: WORD_TEST, // Loremipsumdolorsit
//   }
// })

const arrayData: Item[] = [...Array(ARRAY_TEST)].map((d, index) => {
  return {
    key: `item-${index}`,
    label: String(ARRAY_TEST), // this,is,a test
    // label: ARRAY_TEST, // thisisa test
  }
})

const DraggableList = () => {
  const [data, setData] = useState(initialData)

  console.log('data:', data)

  // console.log('initialData', initialData)

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
