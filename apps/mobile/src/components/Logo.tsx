import React from 'react';
import { StyleSheet, Image } from 'react-native';
import logo from '../../assets/icon.png';

const Logo = () => {
  return <Image source={logo} style={styles.logo} />;
};

export default Logo;

const styles = StyleSheet.create({
  logo: {
    position: 'absolute',
    top: 140,
    width: 80,
    height: 80,
    borderRadius: 100,
  },
});
