import React from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import {NeuButton} from 'react-native-neu-element';
import {Grid, LineChart} from 'react-native-svg-charts';

import Colors from '../utils/Colors';
import {formatNumber, roundNumber} from '../utils/Constants';

export default function Currency({coin, onPress}) {
  // USD percent change and price
  const {
    percent_change_1h: change1h,
    percent_change_24h: change24h,
    percent_change_7d: change7d,
    price,
  } = coin.quote.USD;

  return (
    <NeuButton
      borderRadius={12}
      color="#FFFFFF"
      containerStyle={styles.button}
      height={150}
      onPress={onPress}
      style={styles.container}
      width={
        coin.symbol !== 'TWC'
          ? Dimensions.get('window').width / 2 - 30
          : Dimensions.get('window').width - 30
      }>
      {/* Coin info */}
      <View
        style={[
          styles.info,
          {
            width:
              coin.symbol !== 'TWC'
                ? Dimensions.get('window').width / 2 - 50
                : Dimensions.get('window').width - 50,
          },
        ]}>
        {/* Coin name */}
        <Text style={[styles.text, styles.name]}>{coin.name}</Text>

        {/* Coin logo container */}
        <View style={styles.circle}>
          {/* Coin logo */}
          <Image
            resizeMode="contain"
            source={coin.symbol === 'TWC' ? coin.logo : {uri: coin.logo}}
            style={styles.logo}
          />
        </View>
      </View>

      {/* Coin percent change chart */}
      <LineChart
        contentInset={{top: 12, bottom: 12, left: 10}}
        data={[change7d, change24h, change1h]}
        style={styles.chart}
        svg={{stroke: '#d6b14b'}}>
        <Grid svg={{stroke: 'rgba(0, 0, 0, 0.25)'}} />
      </LineChart>

      {/* USD comparison */}
      <View style={styles.comparison}>
        {/* Percent change */}
        <Text
          style={[styles.change, change24h > 0 ? styles.plus : styles.minus]}>
          {roundNumber(change24h, 4)} %
        </Text>

        {/* Price */}
        <Text style={[styles.change, styles.price]}>
          ${formatNumber(roundNumber(price, 6))} USD
        </Text>
      </View>
    </NeuButton>
  );
}

/**
 * Currency component styles.
 */
const styles = StyleSheet.create({
  // Container
  container: {alignSelf: 'center', margin: 10},

  // Button container
  button: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 7.5,
  },

  // Coin info container
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  // Text
  text: {fontFamily: 'Heebo-Regular'},

  // Coin name
  name: {color: Colors.primary_text, fontSize: 16, fontWeight: 'bold'},

  // Coin logo container
  circle: {
    backgroundColor: '#FFFFFF',
    borderRadius: 64,
    justifyContent: 'center',
    alignItems: 'center',
    height: 32,
    width: 32,
  },

  // Coin logo
  logo: {alignSelf: 'center', height: 24, width: 24},

  // Percent change chart container
  chart: {
    position: 'absolute',
    top: 33,
    bottom: 33,
    left: 10,
    height: 80,
    width: '100%',
    zIndex: -1,
  },

  // Coin comparison container
  comparison: {position: 'absolute', bottom: 10, left: 7.5, right: 7.5},

  // Coin change text
  change: {fontFamily: 'Heebo-Regular', fontSize: 14},

  // Coin positive change
  plus: {color: Colors.success},

  // Coin negative change
  minus: {color: Colors.error},

  // Coin price
  price: {color: Colors.primary_text},
});
