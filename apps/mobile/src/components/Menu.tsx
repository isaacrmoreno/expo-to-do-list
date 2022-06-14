import React from 'react'
import tw from 'twrnc'
import { Text, TouchableOpacity, View, useColorScheme } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack/'
import * as WebBrowser from 'expo-web-browser'
import { AntDesign } from '@expo/vector-icons'
import { auth } from '../../firebase'
import { signOut } from 'firebase/auth'
import Constants from 'expo-constants'

const Menu = () => {
  type RootStackParamList = {
    Home: undefined
  }

  const colorScheme = useColorScheme()

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()

  const logOut = async () => {
    await signOut(auth)
      .then(() => {
        navigation.replace('Home')
      })
      .catch((error: { message: string }) => alert(error.message))
  }

  const visitGitHub = async () => {
    WebBrowser.openBrowserAsync('https://github.com/isaacrmoreno')
  }

  return (
    <View style={[tw`flex-1 items-center px-5`, colorScheme === 'dark' && tw`bg-neutral-800`]}>
      {/* {auth?.currentUser === null ? null : (
        <View style={tw`absolute bottom-28`}>
          <Text style={colorScheme === 'dark' ? tw`text-white` : tw`text-black`}>
            Logged In: {auth.currentUser?.email}
          </Text>
        </View>
      )}
      <TouchableOpacity
        onPress={logOut}
        style={[
          tw`absolute bottom-16 justify-center items-center border rounded-full p-2 w-full`,
          colorScheme === 'dark' ? tw`bg-neutral-700` : tw`bg-slate-100`,
        ]}>
        <Text style={colorScheme === 'dark' ? tw`text-white` : tw`text-black`}>Sign Out</Text>
      </TouchableOpacity> */}
      <View style={tw`absolute flex-row bottom-6 items-center`}>
        <TouchableOpacity onPress={visitGitHub}>
          <AntDesign name='github' size={30} color={colorScheme === 'dark' ? 'white' : 'black'} />
        </TouchableOpacity>
        <Text style={colorScheme === 'dark' ? tw`text-white` : tw`text-black`}>
          {'  '}- Version - {Constants?.manifest?.version}
        </Text>
      </View>
    </View>
  )
}

export default Menu
