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
} from 'react-native'
import { DrawerActions, useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import { EvilIcons } from '@expo/vector-icons'
import * as WebBrowser from 'expo-web-browser'
import { AntDesign } from '@expo/vector-icons'
import Constants from 'expo-constants'

const Menu = () => {
  const [showToggle, setShowToggle] = useState<boolean>(false)
  const [stylize, setStylize] = useState<boolean>(false)

  const colorScheme = useColorScheme()

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

  const toggleStylize = () => setStylize(!stylize)

  const showHideToggle = () => setShowToggle(!showToggle)

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
        <View style={tw`absolute flex-row bottom-26 items-center self-end	px-6`}>
          <Text
            style={[tw`px-2 font-bold`, colorScheme === 'dark' ? tw`text-white` : tw`text-black`]}>
            STYLIZE
          </Text>
          <Switch
            trackColor={{ false: '#3e3e3e', true: '#FF4AD8' }} // center color of quail logo
            ios_backgroundColor='#3e3e3e'
            onValueChange={toggleStylize}
            value={stylize}
          />
        </View>
      )}

      <LinearGradient
        colors={['#f6d365', '#fda085']} // #f093fb #f5576c //  #5ee7df #b490ca //  #c3cfe2 #c3cfe2
        style={tw`absolute bottom-40`}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}>
        <Text style={tw`font-bold p-2 `}>This is to show the gradient</Text>
      </LinearGradient>

      <View
        style={tw`absolute flex-row bottom-6 items-center	border-t border-gray-500 w-full pt-2 justify-evenly`}>
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
