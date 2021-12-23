import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AntDesign } from '@expo/vector-icons';
import Logo from '../components/Logo';
import LoginSignUpScreen from './LoginSignUpScreen';

const HomeScreen = () => {
  const [selectLogin, setSelectLogin] = React.useState(false);
  const [selectSignUp, setSelectSignUp] = React.useState(false);

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  type RootStackParamList = {
    LoginSignUp: undefined;
    SignUpApple: undefined;
    SignUpGoogle: undefined;
  };

  const handleLogin = () => {
    setSelectLogin(true);
  };

  const handleSignUp = () => {
    setSelectSignUp(true);
  };

  const resetLoginSignUp = () => {
    setSelectLogin(false);
    setSelectSignUp(false);
  };

  const toggleLoginSignUp = () => {
    if (selectLogin === true) {
      setSelectLogin(false);
      setSelectSignUp(true);
    } else {
      setSelectLogin(true);
      setSelectSignUp(false);
    }
  };

  const constructionAlert = () => {
    Alert.alert('🚧 Under Construction 🚧', 'Please Come Back Later', [
      { text: 'OK', onPress: () => console.log('Alert Construction Pressed') },
    ]);
  };

  return (
    <View style={styles.container}>
      {selectLogin || selectSignUp === true ? (
        <>
          <LoginSignUpScreen
            selectLogin={selectLogin}
            toggleLoginSignUp={toggleLoginSignUp}
          />
          <TouchableOpacity style={styles.backArrow} onPress={resetLoginSignUp}>
            <AntDesign name='left' size={24} color='black' />
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Logo />
          <Text style={styles.baseText}>
            By continuing, you agree to our{' '}
            <Text style={styles.innerText}>User Agreement </Text>
            and <Text style={styles.innerText}>Privacy Policy.</Text>
          </Text>
          <TouchableOpacity style={styles.button} onPress={constructionAlert}>
            <AntDesign style={styles.buttonIcon} name='google' size={24} color='black' />
            <Text style={styles.buttonText}>Continue with Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={constructionAlert}>
            <AntDesign style={styles.buttonIcon} name='apple1' size={24} color='black' />
            <Text style={styles.buttonText}>Continue with Apple </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            <AntDesign style={styles.buttonIcon} name='mail' size={24} color='black' />
            <Text style={styles.buttonText}>Continue with Email</Text>
          </TouchableOpacity>
          <View>
            <Text>
              Already a member?{' '}
              <Text onPress={handleLogin} style={styles.innerText}>
                Log In
              </Text>
            </Text>
          </View>
        </>
      )}
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
  backArrow: {
    padding: 10,
    position: 'absolute',
    top: 50,
    left: -10,
  },
});
