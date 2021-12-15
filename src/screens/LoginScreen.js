import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native' 
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { auth } from '../../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'

const LoginScreen = () => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const [user, setUser] = useState({});

  const navigation = useNavigation()

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged(user => {
  //     if (user) {
  //       navigation.replace('Task')
  //     } 
  //   })
  //   return unsubscribe
  // }, [])

  onAuthStateChanged(auth, (currentUser) => {
    setUser(user)
    if (currentUser) {
      navigation.replace('Task')
    }
  })

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password)
      console.log(user)
    } catch (error) {
      console.log(error.message)
    }
  }

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password)
      console.log(user)
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <KeyboardAvoidingView
    style={styles.container}
    behavior={'padding'}
    >
      <View style={styles.inputContainer}>
        <TextInput
          placeholder='email'
          value={email}
          onChangeText={text =>  setEmail(text)}
          style={styles.input}/>
          <TextInput
          placeholder='password'
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry/>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
        onPress={login}
        style={styles.button}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity
        onPress={register}
        style={[styles.button, styles.buttonOutline]}>
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
      </View>

    </KeyboardAvoidingView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutline: {  
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },
})

