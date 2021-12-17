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
        <AntDesign name='left' size={24} color='black' />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 20,
    // marginBottom: 35,
    width: '100%',
  },
  title: {
    position: 'absolute',
    top: 35,
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  backArrow: {
    position: 'absolute',
    top: 55,
    left: 5,
  },
});
