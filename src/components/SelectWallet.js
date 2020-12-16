import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import {NeuButton} from 'react-native-neu-element';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';

import InputWrapper from './InputWrapper';
import Colors from '../utils/Colors';
import {getLogo} from '../utils/Constants';

export default function SelectWallet({
  height = '100%',
  label = '',
  onPress,
  selected,
  wallets = [],
  width = Dimensions.get('window').width - 50,
}) {
  // Is modal visible?
  const [isVisible, setVisible] = React.useState(false);

  // Selected item info
  const {balance, description, name} = selected;

  return (
    <>
      <InputWrapper height={52} label={label} width={width}>
        {/* Input wrapper */}
        <View style={styles.wrapper}>
          {/* Currency logo */}
          <Image
            resizeMode="contain"
            source={getLogo(
              name === 'MXN' ? name : name === 'UDGC' ? name : description,
            )}
            style={styles.logo}
          />

          {/* Selected wallet info */}
          <View style={styles.wallet}>
            {/* Selected wallet name */}
            <Text editable={false} style={[styles.text, styles.name]}>
              {name === 'MXN'
                ? 'Peso mexicano'
                : name === 'CryptoUDGCoin'
                ? name
                : name}
            </Text>

            {/* Selected wallet balance */}
            <Text style={[styles.text, styles.balance]}>
              <Text style={styles.bold}>Saldo disponible: </Text>
              {balance}
            </Text>
          </View>

          {/* Select wallet button */}
          <NeuButton
            borderRadius={12}
            color="#fcf9f0"
            height={32}
            onPress={() => setVisible(true)}
            width={32}>
            <Icon color="#9E9E9E" name="chevron-down" size={18} />
          </NeuButton>
        </View>
      </InputWrapper>

      {/* Select wallet modal */}
      <Modal
        animationIn="bounceInUp"
        animationOut="bounceOutDown"
        isVisible={isVisible}
        onBackButtonPress={() => setVisible(false)}
        onBackdropPress={() => setVisible(false)}
        onDismiss={() => setVisible(false)}>
        <View style={[styles.modal, {height}]}>
          <View style={styles.header}>
            <Text style={[styles.text, styles.title]}>Elige un monedero</Text>

            <NeuButton
              borderRadius={8}
              color="#FFFFFF"
              height={32}
              onPress={() => setVisible(false)}
              width={32}>
              <Icon color="#9E9E9E" name="close" size={18} />
            </NeuButton>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Currencies list */}
            {wallets.map((item, index) => {
              // Get item info
              const {balance: b, description: d, name: n} = item;

              return (
                <NeuButton
                  key={`currency-${index}`}
                  borderRadius={12}
                  color={Colors.background_primary}
                  containerStyle={styles.option}
                  height={48}
                  onPress={() => {
                    // Select currency
                    onPress(item);
                    // Hide modal
                    setVisible(false);
                  }}
                  style={styles.item}
                  width={Dimensions.get('window').width - 70}>
                  {/* Selected wallet logo */}
                  <Image
                    resizeMode="contain"
                    source={getLogo(
                      n === 'MXN' ? n : d === 'UDGC' ? 'UDGC' : n,
                    )}
                    style={styles.logo}
                  />

                  {/* Selected wallet info */}
                  <View style={styles.wallet}>
                    {/* Selected wallet name */}
                    <Text editable={false} style={[styles.text, styles.name]}>
                      {n === 'MXN'
                        ? 'Peso mexicano'
                        : n === 'UDGC'
                        ? 'CryptoUDGCoin'
                        : n}
                    </Text>

                    {/* Selected wallet balance */}
                    <Text style={[styles.text, styles.balance]}>
                      <Text style={styles.bold}>Saldo disponible: </Text>
                      {b}
                    </Text>
                  </View>

                  {/* Select currency button */}
                  <Icon
                    color={Colors.secondary_text}
                    name="chevron-right"
                    size={21}
                  />
                </NeuButton>
              );
            })}
          </ScrollView>
        </View>
      </Modal>
    </>
  );
}

/**
 * Select currency component styles.
 */
const styles = StyleSheet.create({
  // Input wrapper
  wrapper: {alignItems: 'center', flex: 1, flexDirection: 'row', height: 52},

  // Currency logo
  logo: {height: 32, marginRight: 10, width: 32},

  // Selected wallet info
  wallet: {flex: 1},

  // Text
  text: {color: Colors.primary_text, fontFamily: 'Heebo-Regular'},

  // Selected wallet name
  name: {fontSize: 14, letterSpacing: 0.25},

  // Selected wallet balance
  balance: {fontSize: 12},

  // Text bold
  bold: {fontWeight: 'bold'},

  // Modal
  modal: {
    alignSelf: 'center',
    backgroundColor: Colors.background_primary,
    borderRadius: 12,
    paddingBottom: 20,
    width: Dimensions.get('window').width - 30,
  },

  // Modal header
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  // Modal title
  title: {
    color: Colors.secondary_text,
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },

  // Wallet option
  option: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },

  // Wallet item
  item: {alignSelf: 'center', marginVertical: 5},
});
