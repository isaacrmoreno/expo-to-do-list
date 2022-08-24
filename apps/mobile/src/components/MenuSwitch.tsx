import React from 'react'
import tw from 'twrnc'
import { Switch, useColorScheme, Text } from 'react-native'
import { MenuSwitchProps } from '../types/index'

const MenuSwitch: React.FC = (props: MenuSwitchProps) => {
  const { text, onValueChange, value } = props
  const colorScheme = useColorScheme()
  return (
    <>
      <Text style={colorScheme === 'dark' ? tw`text-white` : tw`text-black`}>{text}</Text>
      <Switch
        trackColor={{ false: '#3e3e3e', true: '#FF4AD8' }}
        ios_backgroundColor='#3e3e3e'
        onValueChange={onValueChange}
        value={value}
      />
    </>
  )
}

export default MenuSwitch
