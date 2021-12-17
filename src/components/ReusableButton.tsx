import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ReusableButtonProps {
  text: string;
  onPress: () => void;
}

const ReusableButton: React.FC<ReusableButtonProps> = ({ text }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ReusableButton;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 20,
    width: '100%',
  },
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
});
