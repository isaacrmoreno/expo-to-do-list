import React, { useState } from 'react'
import tw from 'twrnc'
import {
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
  Share,
  Platform,
  Switch,
  TouchableWithoutFeedback,
  Image,
} from 'react-native'
import coffee from '../../assets/bmc-button.png'
import { EvilIcons } from '@expo/vector-icons'
import * as WebBrowser from 'expo-web-browser'
import Constants from 'expo-constants'

const Menu = () => {
  const [showToggle, setShowToggle] = useState<boolean>(false)
  const [stylize, setStylize] = useState<boolean>(false)

  const colorScheme = useColorScheme()

  const showHideToggle = () => setShowToggle(!showToggle)
  const toggleStylize = () => setStylize(!stylize)

  const onShare = async () => {
    const result = await Share.share({
      message: "Download Quail | A minimalist's to do list",
      url: 'https://quailapp.vercel.app/',
    })
    if (result.action === Share.sharedAction) {
    } else if (result.action === Share.dismissedAction) {
    }
  }

  const visitPrivacyPolicy = () => {
    WebBrowser.openBrowserAsync(
      'https://www.privacypolicies.com/live/c567c43b-e1f5-4abe-86a9-35b61c67c4c2'
    )
  }

  return (
    <View style={[tw`flex-1 items-center px-4`, colorScheme === 'dark' && tw`bg-neutral-800`]}>
      <TouchableOpacity onPress={onShare} style={tw`absolute top-15 left-4`}>
        <EvilIcons
          name={Platform.OS === 'ios' ? 'share-apple' : 'share-google'}
          size={30}
          color={colorScheme === 'dark' ? 'white' : 'black'}
        />
      </TouchableOpacity>
      {(showToggle as boolean) && (
        <View
          style={[
            tw`absolute flex-row items-center w-full justify-between`,
            Platform.OS === 'ios' ? tw`bottom-32` : tw`bottom-14`,
          ]}>
          <Text style={[tw`font-bold`, colorScheme === 'dark' ? tw`text-white` : tw`text-black`]}>
            STYLIZE
          </Text>
          <Switch
            trackColor={{ false: '#3e3e3e', true: '#FF4AD8' }}
            ios_backgroundColor='#3e3e3e'
            onValueChange={toggleStylize}
            value={stylize}
          />
        </View>
      )}
      {Platform.OS === 'ios' ? (
        <TouchableOpacity
          onPress={() => WebBrowser.openBrowserAsync('https://www.buymeacoffee.com/N3j19RC0nH')}
          style={tw`absolute flex-row bottom-14`}>
          <Image source={coffee} style={tw`rounded-lg w-62 h-16`} />
        </TouchableOpacity>
      ) : null}
      <View style={tw`absolute flex-row bottom-6 items-center w-full pt-1 justify-between`}>
        <TouchableOpacity onPress={visitPrivacyPolicy}>
          <Text style={[tw`font-bold`, colorScheme === 'dark' ? tw`text-white` : tw`text-black`]}>
            Privacy Policy
          </Text>
        </TouchableOpacity>
        <Text style={colorScheme === 'dark' ? tw`text-white` : tw`text-black`}>|</Text>
        <TouchableWithoutFeedback onLongPress={showHideToggle}>
          <Text style={colorScheme === 'dark' ? tw`text-white` : tw`text-black`}>
            V.{Constants?.manifest?.version}
          </Text>
        </TouchableWithoutFeedback>
      </View>
    </View>
  )
}

export default Menu
