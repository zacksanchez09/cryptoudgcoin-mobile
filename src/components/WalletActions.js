import React from 'react';
import {StyleSheet, View} from 'react-native';
import {NeuButton} from 'react-native-neu-element';
import Icon from 'react-native-vector-icons/FontAwesome';

import Colors from '../utils/Colors';

export default function WalletActions({
  item,
  onPressInfo = () => {},
  onPressDelete = () => {},
}) {
  return (
    <View style={styles.container}>
      {/* Wallet info button */}
      <NeuButton
        borderRadius={12}
        color={Colors.background_primary}
        height={48}
        onPress={onPressInfo}
        style={styles.button}
        width={48}>
        <Icon color={Colors.info} name="info" size={32} />
      </NeuButton>

      {/* Wallet delete button
      {item.name !== 'MXN' && (
        <NeuButton
          borderRadius={12}
          color={Colors.background_primary}
          height={48}
          onPress={onPressDelete}
          style={styles.button}
          width={48}>
          <Icon color={Colors.error} name="trash" size={32} />
        </NeuButton>
      )} */}
    </View>
  );
}

/**
 * Wallet actions component styles.
 */
const styles = StyleSheet.create({
  // Container
  container: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: 10,
    marginHorizontal: 15,
  },

  // Button
  button: {marginHorizontal: 5},
});
