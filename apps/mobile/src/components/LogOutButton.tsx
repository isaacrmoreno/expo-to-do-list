import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
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
    <View style={styles.containerWrapper}>
      {auth?.currentUser === null ? null : (
        <View style={styles.auth}>
          <Text>Logged In: {auth.currentUser?.email}</Text>
        </View>
      )}

      <TouchableOpacity onPress={logOut} style={styles.signOutButton}>
        <Text>Sign Out</Text>
      </TouchableOpacity>
      <View style={styles.footer}>
        <TouchableOpacity onPress={visitGitHub}>
          <AntDesign name='github' size={30} color='black' />
        </TouchableOpacity>
        <Text> - Version - {Constants?.manifest?.version}</Text>
      </View>
    </View>
  )
}

export default LogOutButton

const styles = StyleSheet.create({
  containerWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    paddingHorizontal: 20,
  },
  signOutButton: {
    position: 'absolute',
    bottom: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    height: 30,
    width: '100%',
  },
  githubButton: {
    position: 'absolute',
    bottom: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    height: 30,
    width: '100%',
  },
  auth: {
    position: 'absolute',
    bottom: 100,
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 30,
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
  },
})
