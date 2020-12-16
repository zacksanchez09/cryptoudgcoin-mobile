import React from 'react';
import {withNavigation} from 'react-navigation';
import {ScrollView, StyleSheet} from 'react-native';

import WalletFilter from './WalletFilter';
import {CURRENCIES} from '../utils/Constants';

function UserWallets({coin = null, onPress}) {
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      horizontal={true}
      indicatorStyle="white"
      showsHorizontalScrollIndicator={false}>
      {/* Wallet filter list */}
      {CURRENCIES.map((item, index) => {
        // Get item info
        const {id, name, image} = item;

        if (id === 'MXN' || id === 'UDGC') {
          return (
            <WalletFilter
              key={`filter-${index}`}
              image={image}
              name={name}
              symbol={id}
            />
          );
        } else {
          return (
            <WalletFilter
              key={`filter-${index}`}
              image={image}
              isSelected={item === coin}
              onPress={() => onPress(item)}
              name={name}
              symbol={id}
            />
          );
        }
      })}
    </ScrollView>
  );
}

/**
 * User wallets component styles.
 */
const styles = StyleSheet.create({
  // Container
  container: {paddingHorizontal: 5},
});

export default withNavigation(UserWallets);
