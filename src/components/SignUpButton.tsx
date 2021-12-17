import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

interface SignUpButtonProps {
  icon: 'google' | 'apple1' | 'mail';
  text: string;
  onPress: () => void;
}

const SignUpButton: React.FC<SignUpButtonProps> = ({ icon, text }) => {
  return (
    <TouchableOpacity style={styles.button}>
      <AntDesign style={styles.buttonIcon} name={icon} size={24} color='black' />
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

export default SignUpButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
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
});
