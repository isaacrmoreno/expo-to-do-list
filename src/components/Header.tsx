import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
interface HeaderProps {
  ScreenTitle: string;
}

const Header: React.FC<HeaderProps> = ({ ScreenTitle }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{ScreenTitle}</Text>
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
