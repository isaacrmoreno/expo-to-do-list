import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack/';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';

const HomeButton = () => {
  type RootStackParamList = {
    Home: undefined;
  };

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const navigateHome = async () => {
    await signOut(auth)
      .then(() => {
        navigation.replace('Home');
      })
      .catch((error: { message: string }) => alert(error.message));
  };

  return (
    <View>
      <TouchableOpacity onPress={navigateHome} style={styles.signOutButton}>
        <Text>Home</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeButton;

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
