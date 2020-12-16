import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NeuButton} from 'react-native-neu-element';

import Colors from '../utils/Colors';

export default function ExchangeItem({icon, name, onPress = () => {}}) {
  return (
    <View style={styles.container}>
      <NeuButton
        borderRadius={12}
        color="#FFFFFF"
        containerStyle={styles.content}
        height={56}
        onPress={onPress}
        style={styles.button}
        width={56}>
        {icon}
      </NeuButton>

      <Text style={styles.label}>{name}</Text>
    </View>
  );
}

/**
 * Exchange item styles.
 */
const styles = StyleSheet.create({
  // Column
  container: {flexDirection: 'column', marginBottom: 10, marginHorizontal: 5},

  // Button
  button: {marginVertical: 10, marginHorizontal: 8},

  // Button content
  content: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  // Button label
  label: {
    alignSelf: 'center',
    color: Colors.primary_text,
    fontFamily: 'Heebo-Regular',
    fontSize: 14,
    letterSpacing: 0.25,
    textAlign: 'center',
    width: 66,
  },
});
