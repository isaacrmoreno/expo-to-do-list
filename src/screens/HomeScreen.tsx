import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import logo from '../../assets/icon.png';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';

const HomeScreen = () => {
  type RootStackParamList = {
    Login: undefined;
    Email: undefined;
  };

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />

      <Text style={styles.baseText}>
        By continuing, you agree to our{' '}
        <Text style={styles.innerText}>User Agreement </Text>
        and <Text style={styles.innerText}>Privacy Policy.</Text>
      </Text>

      <TouchableOpacity style={styles.button}>
        <AntDesign style={styles.buttonIcon} name='google' size={24} color='black' />
        <Text style={styles.buttonText}>Continue with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <AntDesign style={styles.buttonIcon} name='apple1' size={24} color='black' />
        <Text style={styles.buttonText}>Continue with Apple</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Email')}>
        <MaterialIcons style={styles.buttonIcon} name='email' size={24} color='black' />
        <Text style={styles.buttonText}>Continue with Email</Text>
      </TouchableOpacity>

      <View>
        <Text>
          Already a member?{' '}
          <Text onPress={() => navigation.navigate('Login')} style={styles.innerText}>
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
  logo: {
    width: 80,
    height: 80,
    marginBottom: 275,
    borderRadius: 100,
  },
});
