import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Header from '../components/Header';
import Logo from '../components/Logo';
import ReusableButton from '../components/ReusableButton';

const SignUpEmailScreen = () => {
  type RootStackParamList = {
    Email: undefined;
    Login: undefined;
  };

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  // const navigateToEmailSignUp = async () => {
  //   navigation.replace('Email');
  // };

  return (
    <View style={styles.container}>
      <Header ScreenTitle={'Sign Up'} />
      <Logo />
      <ReusableButton text='Sign Up' onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

export default SignUpEmailScreen;

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
