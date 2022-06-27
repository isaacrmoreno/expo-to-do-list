import React from 'react'
import tw from 'twrnc'
import { Text, TouchableOpacity, View, useColorScheme, Share, Platform } from 'react-native'
import { DrawerActions, useNavigation } from '@react-navigation/native'
import { EvilIcons } from '@expo/vector-icons'
import * as WebBrowser from 'expo-web-browser'
import { AntDesign } from '@expo/vector-icons'
import Constants from 'expo-constants'

const Menu = () => {
  const colorScheme = useColorScheme()
  const navigation = useNavigation<any>()

  const onShare = async () => {
    const result = await Share.share({
      message: "Download Quail | A minimalist's to do list",
      url: 'https://quailapp.vercel.app/',
    })
    if (result.action === Share.sharedAction) {
    } else if (result.action === Share.dismissedAction) {
      navigation.dispatch(DrawerActions.closeDrawer())
    }
  }

  const visitPrivacyPolicy = () => {
    WebBrowser.openBrowserAsync(
      'https://www.privacypolicies.com/live/c567c43b-e1f5-4abe-86a9-35b61c67c4c2'
    )
  }

  const visitGitHub = async () => {
    WebBrowser.openBrowserAsync('https://github.com/isaacrmoreno/expo-to-do-list')
  }

  return (
    <View style={[tw`flex-1 items-center px-5`, colorScheme === 'dark' && tw`bg-neutral-800`]}>
      <View
        style={tw`absolute flex-row bottom-16 justify-center items-center border-b border-gray-500 w-full pb-2`}>
        <TouchableOpacity onPress={onShare}>
          <EvilIcons
            name={Platform.OS === 'ios' ? 'share-apple' : 'share-google'}
            size={24}
            color={colorScheme === 'dark' ? 'white' : 'black'}
          />
        </TouchableOpacity>
        <Text style={[tw`px-3`, colorScheme === 'dark' ? tw`text-white` : tw`text-black`]}>|</Text>
        <TouchableOpacity onPress={visitPrivacyPolicy}>
          <Text style={[tw`font-bold`, colorScheme === 'dark' ? tw`text-white` : tw`text-black`]}>
            Privacy Policy
          </Text>
        </TouchableOpacity>
      </View>
      <View style={tw`absolute flex-row bottom-6 items-center`}>
        <TouchableOpacity onPress={visitGitHub}>
          <AntDesign name='github' size={24} color={colorScheme === 'dark' ? 'white' : 'black'} />
        </TouchableOpacity>
        <Text style={colorScheme === 'dark' ? tw`text-white` : tw`text-black`}>
          {' '}
          - Version - {Constants?.manifest?.version}
        </Text>
      </View>
    </View>
  )
}

export default Menu
