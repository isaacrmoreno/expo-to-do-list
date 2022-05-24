import React, { useState } from 'react'
import tw from 'twrnc'
import { Text, TouchableOpacity, View, Alert, useColorScheme } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import Logo from '../components/Logo'
import LoginSignUpScreen from './LoginSignUpScreen'
import SignUpButton from '../components/SignUpButton'

const HomeScreen = () => {
  const [selectLogin, setSelectLogin] = useState<boolean>(false)
  const [selectSignUp, setSelectSignUp] = useState<boolean>(false)

  const colorScheme = useColorScheme()

  const handleLogin = () => {
    setSelectLogin(true)
  }

  const handleSignUp = () => {
    setSelectSignUp(true)
  }

  const resetLoginSignUp = () => {
    setSelectLogin(false)
    setSelectSignUp(false)
  }

  const toggleLoginSignUp = () => {
    if (selectLogin === true) {
      setSelectLogin(false)
      setSelectSignUp(true)
    } else {
      setSelectLogin(true)
      setSelectSignUp(false)
    }
  }

  const constructionAlert = () => {
    Alert.alert('🚧 Under Construction', 'Please Come Back Later 🚧', [
      { text: 'OK', onPress: () => console.log('Alert Construction Pressed') },
    ])
  }

  return (
    <View style={tw`flex-1 justify-end items-center mx-6 mb-8`}>
      {selectLogin || selectSignUp === true ? (
        <>
          <TouchableOpacity
            style={tw`absolute top-15 -left-2`}
            onPress={resetLoginSignUp}>
            {colorScheme === 'dark' ? (
              <AntDesign name='left' size={24} color='white' />
            ) : (
              <AntDesign name='left' size={24} color='black' />
            )}
          </TouchableOpacity>
          <LoginSignUpScreen
            selectLogin={selectLogin}
            toggleLoginSignUp={toggleLoginSignUp}
          />
        </>
      ) : (
        <>
          <Logo />
          <Text
            style={[
              tw`text-center mb-4`,
              colorScheme === 'dark' ? tw`text-white` : tw`text-black`,
            ]}>
            By continuing, you agree to our{' '}
            <Text style={tw`font-bold`} onPress={constructionAlert}>
              User Agreement{' '}
            </Text>
            and{' '}
            <Text style={tw`font-bold`} onPress={constructionAlert}>
              Privacy Policy.
            </Text>
          </Text>
          {/* <SignUpButton
            name='apple1'
            authType='Apple'
            size={24}
            color='black'
            onPress={constructionAlert}
          /> */}
          <SignUpButton
            name='mail'
            authType='Email'
            size={24}
            color='black'
            onPress={handleSignUp}
          />
          <View>
            <Text style={colorScheme === 'dark' ? tw`text-white` : tw`text-black`}>
              Already a member?{' '}
              <Text onPress={handleLogin} style={tw`font-bold`}>
                Log In
              </Text>
            </Text>
          </View>
        </>
      )}
    </View>
  )
}

export default HomeScreen
