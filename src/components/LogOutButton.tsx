import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack/';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';

const LogOutButton = () => {
  type RootStackParamList = {
    Login: undefined;
  };

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const logOut = async () => {
    await signOut(auth)
      .then(() => {
        navigation.replace('Login');
      })
      .catch((error: { message: string }) => alert(error.message));
  };

  return (
    <View>
      <TouchableOpacity onPress={logOut} style={styles.signOutButton}>
        <Text>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LogOutButton;

const styles = StyleSheet.create({
  signOutButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 100,
    height: 30,
  },
});
