import React, { useState } from 'react'
import tw from 'twrnc'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native'
import { auth } from '../../firebase'
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from 'firebase/auth'
import { Entypo } from '@expo/vector-icons'
import Logo from '../components/Logo'
import Header from '../components/Header'
import { loginSignUpScreenProps } from '../types'
import Toast from 'react-native-toast-message'

const LoginSignUpScreen: React.FC<loginSignUpScreenProps> = ({
  selectLogin,
  toggleLoginSignUp,
}) => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [displayPassword, setDisplayPassword] = useState<boolean>(false)
  const [user, setUser] = useState<{}>({})

  const colorScheme = useColorScheme()

  type RootStackParamList = {
    Drawer: undefined
  }

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()

  const viewPassword = () => {
    setDisplayPassword(true)
  }

  const hidePassword = () => {
    setDisplayPassword(false)
  }

  onAuthStateChanged(auth, (currentUser) => {
    setUser(user)
    currentUser ? navigation.replace('Drawer') : null
  })

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password)
      console.log('user', user)
      console.log('auth', auth)
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: error.message,
        position: 'bottom',
        bottomOffset: 50,
        autoHide: true,
        visibilityTime: 3000,
      })
    }
  }

  const signUp = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password)
      console.log(user)
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: error.message,
        position: 'bottom',
        bottomOffset: 50,
        autoHide: true,
        visibilityTime: 3000,
      })
    }
  }

  return (
    <View style={tw`flex-1 justify-center items-center`}>
      <Logo />
      {selectLogin ? <Header ScreenTitle='Log In' /> : <Header ScreenTitle='Sign Up' />}
      <View style={tw`absolute top-1/3 w-10/12`}>
        <TextInput
          style={tw`bg-white px-5 py-3 rounded-full mb-4`}
          placeholder='email'
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        {displayPassword === true ? (
          <View>
            <TextInput
              style={tw`bg-white px-5 py-3 rounded-full mb-2`}
              placeholder='password'
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={false}
            />
            <TouchableOpacity style={tw`absolute top-2 right-5`} onPress={hidePassword}>
              <Entypo name='eye-with-line' size={24} color='black' />
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <TextInput
              style={tw`bg-white px-5 py-3 rounded-full mb-2`}
              placeholder='password'
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
            />
            <TouchableOpacity style={tw`absolute top-2 right-5`} onPress={viewPassword}>
              <Entypo name='eye' size={24} color='black' />
            </TouchableOpacity>
          </View>
        )}
        <View>
          <Text
            style={[
              tw`text-center`,
              colorScheme === 'dark' ? tw`text-white` : tw`text-black`,
            ]}>
            {selectLogin === true ? 'Dont have an account? ' : 'Already a member?'}
            <Text style={tw`font-bold`} onPress={toggleLoginSignUp}>
              {selectLogin === true ? 'Sign Up' : 'Log In'}
            </Text>
          </Text>
        </View>
      </View>
      {/* {user === true ? (
        <ActivityIndicator
          size='large'
          animating={true}
          style={styles.activityIndicator}
        />
      ) : (
        <ActivityIndicator
          size='large'
          animating={false}
          style={styles.activityIndicator}
        />
      )} */}
      <KeyboardAvoidingView style={tw`items-center w-10/12`} behavior='position'>
        <TouchableOpacity
          onPress={login}
          style={[
            tw`p-2 flex-row w-full rounded-full mb-2`,
            colorScheme === 'dark' ? tw`bg-slate-600` : tw`bg-white`,
          ]}>
          <Text
            style={[
              tw`flex-1 text-lg font-bold text-center`,
              colorScheme === 'dark' ? tw`text-white` : tw`text-black`,
            ]}>
            {selectLogin === true ? 'Log In' : 'Sign Up'}
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  )
}

export default LoginSignUpScreen
