import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

interface BackButtonProps {
  selectLogin: Function;
  setSelectSignUp: Function;
}

const BackButton: React.FC<BackButtonProps> = ({ selectLogin, setSelectSignUp }) => {
  const resetLoginSignUp = () => {
    selectLogin(false);
    setSelectSignUp(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backArrow} onPress={resetLoginSignUp}>
        <AntDesign name='left' size={24} color='black' />
      </TouchableOpacity>
    </View>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    top: 35,
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  backArrow: {
    padding: 10,
    position: 'absolute',
    top: 50,
    right: 180,
  },
});
