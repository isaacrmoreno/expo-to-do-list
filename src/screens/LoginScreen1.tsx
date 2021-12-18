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
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { Entypo } from '@expo/vector-icons';
import Logo from '../components/Logo';
import Header from '../components/Header';

const LoginScreen1 = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [displayPassword, setDisplayPassword] = React.useState(false);

  const [user, setUser] = useState({});

  type RootStackParamList = {
    Login: undefined;
    Task: undefined;
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
    if (currentUser) {
      navigation.replace('Task');
    }
  });

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Header ScreenTitle='Log In' />
      <Logo />
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
      </View>

      <KeyboardAvoidingView style={styles.buttonContainer} behavior='position'>
        <TouchableOpacity onPress={login} style={styles.button}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginScreen1;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginBottom: 35,
  },
  inputContainer: {
    position: 'absolute',
    top: '35%',
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
    marginBottom: 15,
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
});
