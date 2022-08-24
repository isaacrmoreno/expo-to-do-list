import React, { useEffect } from 'react'
import tw from 'twrnc'
import { Text, TouchableOpacity, View, useColorScheme, Share, Platform, Linking } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { EvilIcons } from '@expo/vector-icons'
import * as StoreReview from 'expo-store-review'
import * as WebBrowser from 'expo-web-browser'
import * as Application from 'expo-application'
import useStore from '../store/index'
import MenuSwitch from './MenuSwitch'

const Menu = () => {
  const stylized = useStore((state) => state?.stylized)
  const setStylized = useStore((state) => state?.setStylized)
  const isMuted = useStore((state) => state?.isMuted)
  const setIsMuted = useStore((state) => state?.setIsMuted)

  const colorScheme = useColorScheme()
  const itunesItemId = 1630267516
  const androidPackageName = 'com.expotodolist.prod'

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

  const leaveAppReview = async () => {
    if (await StoreReview.hasAction()) {
      StoreReview.isAvailableAsync()
    } else {
      Platform.OS === 'ios'
        ? Linking.openURL(
            `itms-apps://itunes.apple.com/app/viewContentsUserReviews/id${itunesItemId}?action=write-review`
          )
        : Linking.openURL(`market://details?id=${androidPackageName}&showAllReviews=true`)
    }
  }

  const visitPrivacyPolicy = () => {
    WebBrowser.openBrowserAsync('https://www.privacypolicies.com/live/c567c43b-e1f5-4abe-86a9-35b61c67c4c2')
  }

  const getMultiple = async () => {
    let values
    try {
      values = await AsyncStorage.multiGet(['@stylized', '@isMuted'])
      values?.[0][1] !== null && setStylized(JSON.parse(values?.[0][1]))
      values?.[1][1] !== null && setIsMuted(JSON.parse(values?.[1][1]))
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getMultiple()
  }, [])

  return (
    <View style={[tw`flex-1 items-center px-4`, colorScheme === 'dark' && tw`bg-neutral-800`]}>
      <View style={tw`absolute top-15 left-4 flex-row`}>
        <TouchableOpacity onPress={leaveAppReview} style={tw`pr-20`}>
          <Text style={colorScheme === 'dark' ? tw`text-white` : tw`text-black`}>Leave A Review</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onShare}>
          <EvilIcons
            name={Platform.OS === 'ios' ? 'share-apple' : 'share-google'}
            size={30}
            color={colorScheme === 'dark' ? 'white' : 'black'}
          />
        </TouchableOpacity>
      </View>
      <View style={tw`absolute flex-row items-center w-full justify-between bottom-24 pb-2`}>
        <MenuSwitch text='STYLIZE' onValueChange={showHideStylized} value={stylized} />
      </View>
      <View style={tw`absolute flex-row items-center w-full justify-between bottom-14 pb-2`}>
        <MenuSwitch text='MUTE' onValueChange={playMuteSounds} value={isMuted} />
      </View>
      <View
        style={[
          tw`absolute flex-row items-center w-full justify-between bottom-6 border-t pt-2`,
          colorScheme === 'dark' ? tw`border-white` : tw`border-black`,
        ]}>
        <TouchableOpacity onPress={visitPrivacyPolicy}>
          <Text style={colorScheme === 'dark' ? tw`text-white` : tw`text-black`}>Privacy Policy</Text>
        </TouchableOpacity>
        <Text style={colorScheme === 'dark' ? tw`text-white` : tw`text-black`}>|</Text>
        <Text style={colorScheme === 'dark' ? tw`text-white` : tw`text-black`}>
          {/* V{Application.nativeApplicationVersion} */}
          {/* {console.log('Application', Application)} */}
        </Text>
      </View>
    </View>
  )
}

export default Menu
