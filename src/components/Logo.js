import React from 'react';
import {Image, StyleSheet} from 'react-native';

import {APP_LOGO} from '../utils/Constants';

export default function Logo({size = 173.66}) {
  return (
    <Image
      resizeMode="contain"
      source={APP_LOGO}
      style={[styles.image, {height: size, width: size}]}
    />
  );
}

/**
 * Logo component styles.
 */
const styles = StyleSheet.create({
  // Image
  image: {alignSelf: 'center', marginVertical: 10},
});
