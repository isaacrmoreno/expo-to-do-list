import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import Logo from '../components/Logo';

const SignUpEmailScreen = () => {
  type RootStackParamList = {
    Email: undefined;
  };

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const navigateToEmailSignUp = async () => {
    navigation.replace('Email');
  };

  return (
    <View style={styles.container}>
      <Logo />
      <Text style={styles.title}>Sign Up</Text>
      <TouchableOpacity style={styles.leftArrow} onPress={() => navigation.goBack()}>
        <AntDesign name='left' size={24} color='black' />
      </TouchableOpacity>
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
  title: {
    position: 'absolute',
    top: 35,
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  leftArrow: {
    position: 'absolute',
    top: 60,
    left: 0,
  },
});
