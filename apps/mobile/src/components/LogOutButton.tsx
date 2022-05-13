import React from 'react'
import tw from 'twrnc'
import { Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack/'
import * as WebBrowser from 'expo-web-browser'
import { AntDesign } from '@expo/vector-icons'
import { auth } from '../../firebase'
import { signOut } from 'firebase/auth'
import Constants from 'expo-constants'

const LogOutButton = () => {
  type RootStackParamList = {
    Home: undefined
  }

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
    <View style={tw`flex-1 items-center px-5`}>
      {auth?.currentUser === null ? null : (
        <View style={tw`absolute bottom-25`}>
          <Text>Logged In: {auth.currentUser?.email}</Text>
        </View>
      )}
      <TouchableOpacity
        onPress={logOut}
        style={tw`absolute bottom-16 justify-center items-center bg-slate-100 border rounded-full h-6 w-full`}>
        <Text>Sign Out</Text>
      </TouchableOpacity>
      <View style={tw`absolute flex-row bottom-5 items-center`}>
        <TouchableOpacity onPress={visitGitHub}>
          <AntDesign name='github' size={30} color='black' />
        </TouchableOpacity>
        <Text> - Version - {Constants?.manifest?.version}</Text>
      </View>
    </View>
  )
}

export default LogOutButton
