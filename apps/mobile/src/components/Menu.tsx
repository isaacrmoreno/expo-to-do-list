import React, { useState, useEffect } from 'react'
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
import AsyncStorage from '@react-native-async-storage/async-storage'
import coffee from '../../assets/bmc-button.png'
import { EvilIcons } from '@expo/vector-icons'
import * as WebBrowser from 'expo-web-browser'
import Constants from 'expo-constants'
import useStore from '../store/index'

const Menu = () => {
  const [showToggle, setShowToggle] = useState<boolean>(false)

  const stylized = useStore((state) => state?.stylized)
  const setStylized = useStore((state) => state?.setStylized)

  const colorScheme = useColorScheme()

  // const showHideToggle = () => setShowToggle(!showToggle) // first thing I want to save.
  // second is if setStylized.

  const multiSet = async () => {
    const firstPair = ['@MyApp_user', 'value_1']
    const secondPair = ['@MyApp_key', 'value_2']
    try {
      await AsyncStorage.multiSet([firstPair, secondPair])
    } catch (e) {
      //save error
    }

    console.log('Done.')
  }

  const getMultiple = async () => {
    let values
    try {
      values = await AsyncStorage.multiGet(['@MyApp_user', '@MyApp_key'])
    } catch (e) {
      console.log(e)
    }
    console.log(values)
    // example console.log output:
    // [ ['@MyApp_user', 'myUserValue'], ['@MyApp_key', 'myKeyValue'] ]
  }

  const showHideToggle = async () => {
    try {
      const jsonValue = JSON.stringify(showToggle)
      console.log('beforeSetItem', showToggle)
      await AsyncStorage.setItem('@toggle', jsonValue)
      console.log('afterSetItem', showToggle)
      setShowToggle(!showToggle)
      console.log('aftersetState', showToggle)
    } catch (e) {
      console.log(e)
    }
  }

  const getToggleState = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@toggle')
      jsonValue !== null && setShowToggle(JSON.parse(jsonValue))
    } catch (e) {
      console.log(e)
    }
  }

  // const stylize = async () => {
  //   try {
  //     // setStylized(!stylized)
  //     console.log('before setItem', stylized)
  //     const jsonValue = JSON.stringify(stylized)
  //     await AsyncStorage.setItem('@styledState', jsonValue)
  //     console.log('after setItem', stylized)
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }

  const getStyles = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@styledState')
      // console.log('before', jsonValue) // null
      jsonValue !== null && setStylized(jsonValue)
      // console.log('after settingSetStyled:', jsonValue) // null
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

  // useEffect(() => {
  //   getStyles()
  // }, [])

  useEffect(() => {
    getToggleState()
  }, [])

  const removeValues = async () => {
    const keys = ['@styledState', '@toggle']
    try {
      await AsyncStorage.multiRemove(keys)
    } catch (e) {
      console.log(e)
    }
    console.log('Done.')
  }

  return (
    <View style={[tw`flex-1 items-center px-4`, colorScheme === 'dark' && tw`bg-neutral-800`]}>
      <View style={tw`absolute top-15 left-4`}>
        <TouchableOpacity onPress={onShare} style={tw`absolute top-15 left-4`}>
          <EvilIcons
            name={Platform.OS === 'ios' ? 'share-apple' : 'share-google'}
            size={30}
            color={colorScheme === 'dark' ? 'white' : 'black'}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={removeValues}>
          <Text>RESET</Text>
        </TouchableOpacity>
      </View>

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
            onValueChange={() => setStylized(!stylized)}
            // onValueChange={stylize}
            value={stylized}
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
            V{Constants?.manifest?.version}
          </Text>
        </TouchableWithoutFeedback>
      </View>
    </View>
  )
}

export default Menu
