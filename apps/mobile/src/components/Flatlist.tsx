import React, { useState } from 'react'
import tw from 'twrnc'
import { Text, TouchableOpacity } from 'react-native'
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from 'react-native-draggable-flatlist'

const NUM_ITEMS = 10
function getColor(i: number) {
  const multiplier = 255 / (NUM_ITEMS - 1)
  const colorVal = i * multiplier
  return `rgb(${colorVal}, ${Math.abs(128 - colorVal)}, ${255 - colorVal})`
}

type Item = {
  key: string
  description: string
  height: number
  width: number
  backgroundColor: string
}

const initialData: Item[] = [...Array(NUM_ITEMS)].map((d, index) => {
  const backgroundColor = getColor(index)
  return {
    key: `item-${index}`,
    description: String(index) + '',
    height: 100,
    width: 60 + Math.random() * 40,
    backgroundColor,
  }
})

const FlatList = () => {
  const [data, setData] = useState(initialData)

  const renderItem = ({ item, drag, isActive }: RenderItemParams<Item>) => {
    return (
      <ScaleDecorator>
        <TouchableOpacity
          onLongPress={drag}
          disabled={isActive}
          style={[
            tw`flex-row w-4/5 rounded-lg mb-6 items-center`,
            { backgroundColor: isActive ? 'red' : 'white' },
          ]}>
          <Text style={tw`text-black text-lg font-bold text-center`}>{item.description}</Text>
        </TouchableOpacity>
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

export default FlatList
