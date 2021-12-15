import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import logo from '../../assets/icon.png';
import { MaterialIcons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';

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
      <Image source={logo} style={styles.logo} />

      <Text style={styles.baseText}>
        By continuing, you agree to our{' '}
        <Text style={styles.innerText}>User Agreement </Text>
        and <Text style={styles.innerText}>Privacy Policy.</Text>
      </Text>

      <TouchableOpacity style={styles.button}>
        <MaterialIcons style={styles.buttonIcon} name='email' size={24} color='black' />
        <Text style={styles.buttonText}>Continue with Email</Text>
      </TouchableOpacity>

      <View></View>
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
  logo: {
    width: 80,
    height: 80,
    marginBottom: 275,
    borderRadius: 100,
  },
});
