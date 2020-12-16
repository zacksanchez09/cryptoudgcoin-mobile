import React from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import {NeuButton} from 'react-native-neu-element';

import Colors from '../utils/Colors';

export default function WalletItem({item, logo, onPress}) {
  // Get Wallet item info
  const {balance, description, name} = item;

  return (
    <NeuButton
      borderRadius={12}
      color={Colors.background_primary}
      containerStyle={styles.container}
      onPress={onPress}
      height={72}
      style={styles.button}
      width={Dimensions.get('window').width - 30}>
      {/* Wallet info section */}
      <View style={styles.info}>
        {/* Wallet coin logo */}
        <Image resizeMode="contain" source={logo} style={styles.logo} />

        {/* Wallet coin info */}
        <View>
          {/* Wallet coin name */}
          <Text style={[styles.text, styles.name]}>
            {name === 'MXN'
              ? 'Peso mexicano'
              : name === 'UDGC'
              ? 'CryptoUDGCoin'
              : name}
          </Text>

          {/* Wallet coin symbol */}
          <Text style={[styles.text, styles.symbol]}>
            {name === 'MXN' ? 'MXN' : description === 'UDGC' ? 'UDGC' : name}
          </Text>
        </View>
      </View>

      {/* Wallet balance */}
      <View>
        <Text style={[styles.text, styles.available]}>Saldo disponible</Text>
        <Text style={[styles.text, styles.balance]}>{balance}</Text>
      </View>
    </NeuButton>
  );
}

/**
 * Wallet list item component styles.
 */
const styles = StyleSheet.create({
  // Button container
  button: {alignSelf: 'center', marginVertical: 5},

  // Content container
  container: {
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 15,
    width: Dimensions.get('window').width - 30,
  },

  // Info container
  info: {alignItems: 'center', flexDirection: 'row'},

  // Wallet logo
  logo: {height: 32, marginRight: 10, width: 32},

  // Text
  text: {color: Colors.primary_text, fontFamily: 'Heebo-Regular'},

  // Wallet name
  name: {fontFamily: 'Heebo-Medium', fontSize: 14},

  // Wallet symbol
  symbol: {fontSize: 12},

  // Available balance
  available: {
    color: Colors.secondary_text,
    fontFamily: 'Heebo-Medium',
    fontSize: 12,
    textAlign: 'right',
  },

  // Wallet balance
  balance: {textAlign: 'right'},
});
