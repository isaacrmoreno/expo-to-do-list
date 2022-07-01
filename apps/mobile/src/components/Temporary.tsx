const NUM_ITEMS = 10
function getColor(i: number) {
  const multiplier = 255 / (NUM_ITEMS - 1)
  const colorVal = i * multiplier
  return `rgb(${colorVal}, ${Math.abs(128 - colorVal)}, ${255 - colorVal})`
}

type Item = {
  key: string
  label: string
  height: number
  width: number
  backgroundColor: string
}

const initialData: Item[] = [...Array(NUM_ITEMS)].map((d, index) => {
  const backgroundColor = getColor(index)
  return {
    key: `item-${index}`,
    label: String(index) + '',
    height: 100,
    width: 60 + Math.random() * 40,
    backgroundColor,
  }
})
