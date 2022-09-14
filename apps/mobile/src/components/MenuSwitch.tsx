import React from 'react'
import tw from 'twrnc'
import { Switch, useColorScheme, Text } from 'react-native'
import { MenuSwitchProps } from '../types/index'

const MenuSwitch: React.FC<MenuSwitchProps> = ({ text, onValueChange, value, testID }) => {
  const colorScheme = useColorScheme()
  return (
    <>
      <Text style={[tw`font-bold`, colorScheme === 'dark' ? tw`text-white` : tw`text-black`]}>{text}</Text>
      <Switch
        testID={testID}
        trackColor={{ false: '#3e3e3e', true: '#FF4AD8' }}
        ios_backgroundColor='#3e3e3e'
        onValueChange={onValueChange}
        value={value}
      />
    </>
  )
}

export default MenuSwitch
