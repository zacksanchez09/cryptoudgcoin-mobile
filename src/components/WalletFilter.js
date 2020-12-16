import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {NeuView} from 'react-native-neu-element';

import Colors from '../utils/Colors';

export default function WalletFilter({
  image,
  isSelected = false,
  name,
  onPress = () => {},
  symbol,
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={onPress}
      style={styles.touchable}>
      <NeuView
        borderRadius={24}
        color={Colors.background_primary}
        containerStyle={styles.content}
        height={90}
        inset={isSelected}
        style={styles.container}
        width={185}>
        {/* Coin image */}
        <Image resizeMode="contain" source={image} style={styles.image} />

        <View style={styles.info}>
          {/* Coin name */}
          <Text style={[styles.text, styles.name]}>{name}</Text>

          {/* Coin symbol */}
          <Text style={[styles.text, styles.symbol]}>{symbol}</Text>
        </View>
      </NeuView>
    </TouchableOpacity>
  );
}

/**
 * Coin wallet component styles.
 */
const styles = StyleSheet.create({
  // Container
  container: {marginVertical: 10, marginHorizontal: 8},

  // Content
  content: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },

  // Image
  image: {height: 42, marginRight: 7.5, width: 48},

  // Info container
  info: {flex: 1, justifyContent: 'flex-start'},

  // Text
  text: {color: Colors.primary_text, fontFamily: 'Heebo-Regular'},

  // Coin name
  name: {
    fontFamily: 'Heebo-Medium',
    fontSize: 14,
    letterSpacing: 0.25,
    marginVertical: 5,
  },

  // Coin symbol
  symbol: {fontSize: 12, letterSpacing: 0.25},
});
