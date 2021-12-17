import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AntDesign } from '@expo/vector-icons';
import Logo from '../components/Logo';
import SignUpButton from '../components/SignUpButton';

const HomeScreen = () => {
  type RootStackParamList = {
    Login: undefined;
    Email: undefined;
    Apple: undefined;
    Google: undefined;
    SignUp: undefined;
  };

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <Logo />

      <Text style={styles.baseText}>
        By continuing, you agree to our{' '}
        <Text style={styles.innerText}>User Agreement </Text>
        and <Text style={styles.innerText}>Privacy Policy.</Text>
      </Text>

      {/* <SignUpButton
        icon='google'
        text='Continue With Google'
        onPress={() => navigation.navigate('Google')}
      />
      <SignUpButton
        icon='apple1'
        text='Continue With Apple'
        onPress={() => navigation.navigate('Apple')}
      />
      <SignUpButton
        icon='mail'
        text='Continue With Email'
        onPress={() => navigation.navigate('Email')}
      /> */}

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login')}>
        <AntDesign style={styles.buttonIcon} name='google' size={24} color='black' />
        <Text style={styles.buttonText}>Continue with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login')}>
        <AntDesign style={styles.buttonIcon} name='apple1' size={24} color='black' />
        <Text style={styles.buttonText}>Continue with Apple </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('SignUp')}>
        <AntDesign style={styles.buttonIcon} name='mail' size={24} color='black' />
        <Text style={styles.buttonText}>Continue with Email</Text>
      </TouchableOpacity>

      <View>
        <Text>
          Already a member?{' '}
          <Text onPress={() => navigation.navigate('Login1')} style={styles.innerText}>
            Log In
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 20,
    marginBottom: 35,
  },
  button: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    width: '100%',
  },
  buttonText: {
    fontSize: 16,
    flex: 1,
    textAlign: 'center',
  },
  buttonIcon: {
    position: 'absolute',
    left: 15,
  },
  baseText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 15,
  },
  innerText: {
    fontWeight: 'bold',
  },
});
