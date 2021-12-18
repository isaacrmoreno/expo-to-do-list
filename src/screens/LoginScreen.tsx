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
import { auth, db } from '../../firebase';
import { collection } from 'firebase/firestore';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';
import { Entypo } from '@expo/vector-icons';

const LoginScreen = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [displayPassword, setDisplayPassword] = React.useState(false);

  const [user, setUser] = useState({});

  type RootStackParamList = {
    Login: undefined;
    Task: undefined;
  };

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged(user => {
  //     if (user) {
  //       navigation.replace('Task')
  //     }
  //   })
  //   return unsubscribe
  // }, [])

  const usersRef = collection(db, 'users');

  // await setDoc(doc(usersRef, "1"), { name: "John Doe" });

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

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      console.log(user);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={'padding'}>
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

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={login} style={styles.button}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={register}
          style={[styles.button, styles.buttonOutline]}>
          <Text style={styles.buttonOutlineText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

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
  icon: {
    position: 'absolute',
    right: 12,
    top: 11,
  },
});
