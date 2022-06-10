import React from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { SignUpButtonProps } from '../types/index'

const SignUpButton: React.FC<SignUpButtonProps> = ({
  name,
  authType,
  size,
  color,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <AntDesign style={styles.buttonIcon} name={name} size={size} color={color} />
      <Text style={styles.buttonText}>Continue with {authType}</Text>
    </TouchableOpacity>
  )
}

export default SignUpButton

const styles = StyleSheet.create({
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
})
