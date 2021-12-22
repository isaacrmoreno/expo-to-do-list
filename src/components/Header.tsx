import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
interface HeaderProps {
  ScreenTitle: string;
}

const Header: React.FC<HeaderProps> = ({ ScreenTitle }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{ScreenTitle}</Text>
      <TouchableOpacity style={styles.backArrow} onPress={() => navigation.goBack()}>
        {console.log('clicked')}
        <AntDesign name='left' size={24} color='black' />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

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
