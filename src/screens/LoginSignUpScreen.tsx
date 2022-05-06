import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { auth } from '../../firebase';
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { Entypo } from '@expo/vector-icons';
import Logo from '../components/Logo';
import Header from '../components/Header';
import { loginSignUpScreenProps } from '../types';
import Toast from 'react-native-toast-message';
import SignUpButton from '../components/SignUpButton'

const LoginSignUpScreen: React.FC<loginSignUpScreenProps> = ({
  selectLogin,
  toggleLoginSignUp,
}) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [displayPassword, setDisplayPassword] = useState<boolean>(false);
  const [user, setUser] = useState<{}>({});

  type RootStackParamList = {
    Drawer: undefined;
  };

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const viewPassword = () => {
    setDisplayPassword(true);
  };

  const hidePassword = () => {
    setDisplayPassword(false);
  };

  onAuthStateChanged(auth, (currentUser) => {
    setUser(user);
    (currentUser) ? navigation.replace('Drawer') : null
  });

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password)
      // console.log('user',user);
			console.log('auth',auth)
			// console.log('email',email)
			// console.log('password',password)
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const signUp = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      console.log(user);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Logo />
      {(selectLogin) 
			? (<Header ScreenTitle='Log In' />) 
			: (<Header ScreenTitle='Sign Up' />)
			}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder='email'
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        {displayPassword === true ? (
          <View>
            <TextInput
              style={styles.input}
              placeholder='password'
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={false}
            />
            <TouchableOpacity style={styles.icon} onPress={hidePassword}>
              <Entypo name='eye-with-line' size={24} color='black' />
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <TextInput
              style={styles.input}
              placeholder='password'
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
            />
            <TouchableOpacity style={styles.icon} onPress={viewPassword}>
              <Entypo name='eye' size={24} color='black' />
            </TouchableOpacity>
          </View>
        )}
        <View>
          {selectLogin === true ? (
            <Text style={styles.baseText}>
              Dont have an account?{' '}
              <Text style={styles.innerText} onPress={toggleLoginSignUp}>
                Sign Up
              </Text>
            </Text>
          ) : (
            <Text style={styles.baseText}>
              Already a member?{' '}
              <Text style={styles.innerText} onPress={toggleLoginSignUp}>
                Log In
              </Text>
            </Text>
          )}
        </View>
      </View>

      <KeyboardAvoidingView style={styles.buttonContainer} behavior='position'>
        {selectLogin === true ? (
          <TouchableOpacity onPress={login} style={styles.button}>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={signUp} style={styles.button}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        )}
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginSignUpScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  inputContainer: {
    position: 'absolute',
    top: '30%',
    width: '80%',
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonContainer: {
    width: '80%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
    flex: 1,
    fontWeight: '700',
  },
  icon: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
  baseText: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 13,
  },
  innerText: {
    fontWeight: 'bold',
  },
});
