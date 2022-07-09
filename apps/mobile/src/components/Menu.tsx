import React, { useState, useEffect } from 'react'
import tw from 'twrnc'
import {
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
  Share,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { EvilIcons } from '@expo/vector-icons'
import * as WebBrowser from 'expo-web-browser'
import Constants from 'expo-constants'
import useStore from '../store/index'
import MenuSwitch from './MenuSwitch'

const Menu = () => {
  const [showToggle, setShowToggle] = useState<boolean>(false)

  const stylized = useStore((state) => state?.stylized)
  const setStylized = useStore((state) => state?.setStylized)
  const isMuted = useStore((state) => state?.isMuted)
  const setIsMuted = useStore((state) => state?.setIsMuted)

  const colorScheme = useColorScheme()

  const showHideToggle = async () => {
    try {
      setShowToggle(!showToggle)
      const jsonValue = JSON.stringify(!showToggle)
      await AsyncStorage.setItem('@toggle', jsonValue)
    } catch (e) {
      console.log(e)
    }
  }

  const showHideStylized = async () => {
    try {
      setStylized(!stylized)
      const jsonValue = JSON.stringify(!stylized)
      await AsyncStorage.setItem('@stylized', jsonValue)
    } catch (e) {
      console.log(e)
    }
  }

  const playMuteSounds = async () => {
    try {
      setIsMuted(!isMuted)
      const jsonValue = JSON.stringify(!isMuted)
      await AsyncStorage.setItem('@isMuted', jsonValue)
    } catch (e) {
      console.log(e)
    }
  }

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

  const getMultiple = async () => {
    let values
    try {
      values = await AsyncStorage.multiGet(['@stylized', '@toggle', '@isMuted'])
      values?.[0][1] !== null && setStylized(JSON.parse(values?.[0][1]))
      values?.[1][1] !== null && setShowToggle(JSON.parse(values?.[1][1]))
      values?.[2][1] !== null && setIsMuted(JSON.parse(values?.[2][1]))
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getMultiple()
  }, [])

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
        <View style={tw`absolute flex-row items-center w-full justify-between bottom-24 pb-2`}>
          <MenuSwitch text='STYLIZE' onValueChange={showHideStylized} value={stylized} />
        </View>
      )}
      <View style={tw`absolute flex-row items-center w-full justify-between bottom-14 pb-2`}>
        <MenuSwitch text='MUTE' onValueChange={playMuteSounds} value={isMuted} />
      </View>
      <View
        style={tw`absolute flex-row items-center w-full justify-between bottom-6 border-t pt-2`}>
        <TouchableOpacity onPress={visitPrivacyPolicy}>
          <Text style={[tw`font-bold`, colorScheme === 'dark' ? tw`text-white` : tw`text-black`]}>
            Privacy Policy
          </Text>
        </TouchableOpacity>
        <Text style={colorScheme === 'dark' ? tw`text-white` : tw`text-black`}>|</Text>
        <TouchableWithoutFeedback onLongPress={showHideToggle}>
          <Text style={colorScheme === 'dark' ? tw`text-white` : tw`text-black`}>
            V{Constants?.manifest?.version}
          </Text>
        </TouchableWithoutFeedback>
      </View>
    </View>
  )
}

export default Menu
