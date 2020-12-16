import React, {useState} from 'react';
import {withNavigation} from 'react-navigation';
import {
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {NeuButton} from 'react-native-neu-element';
import Modal from 'react-native-modal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import ExchangeItem from './ExchangeItem';
import Colors from '../utils/Colors';
import {getLogo} from '../utils/Constants';

function ExchangeActions({navigation, wallets = []}) {
  const [isVisible, setVisible] = useState(false);

  return (
    <>
      <ScrollView
        contentContainerStyle={styles.container}
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
        {/* Add funds option */}
        <ExchangeItem
          icon={
            <MaterialCommunityIcons
              color="#d6b14b"
              name="bank-plus"
              size={30}
            />
          }
          name="Depositar"
          onPress={() => navigation.navigate('AddFunds')}
        />

        {/* Transfer option */}
        <ExchangeItem
          icon={<Ionicons color="#d6b14b" name="send" size={30} />}
          name="Enviar"
          onPress={() => navigation.navigate('Transfer')}
        />

        {/* Trade option */}
        <ExchangeItem
          icon={<AntDesign color="#d6b14b" name="swap" size={34} />}
          name="Trade"
          onPress={() => navigation.navigate('Trade')}
        />

        {/* Receive option */}
        <ExchangeItem
          icon={
            <Ionicons
              color="#d6b14b"
              name={Platform.select({android: 'md-scan', ios: 'ios-scan'})}
              size={32}
            />
          }
          name="Recibir"
          onPress={() => setVisible(true)}
        />

        {/* Withdraw option */}
        <ExchangeItem
          icon={
            <MaterialCommunityIcons
              color="#d6b14b"
              name="bank-minus"
              size={30}
            />
          }
          name="Retirar"
          onPress={() => navigation.navigate('Withdraw')}
        />
      </ScrollView>

      {/* Select wallet modal */}
      <Modal
        animationIn="bounceInUp"
        animationOut="bounceOutDown"
        isVisible={isVisible}
        onBackButtonPress={() => setVisible(false)}
        onBackdropPress={() => setVisible(false)}
        onDismiss={() => setVisible(false)}>
        <View
          style={[styles.modal, {height: Dimensions.get('window').height / 2}]}>
          <View style={styles.header}>
            <Text style={[styles.text, styles.title]}>Elige una cartera</Text>

            <NeuButton
              borderRadius={8}
              color="#FFFFFF"
              height={32}
              onPress={() => setVisible(false)}
              width={32}>
              <MaterialCommunityIcons color="#9E9E9E" name="close" size={18} />
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
                    // Hide modal
                    setVisible(false);
                    // Select currency
                    navigation.navigate('Wallet', {wallet: item});
                  }}
                  style={styles.item}
                  width={Dimensions.get('window').width - 70}>
                  {/* Selected wallet logo */}
                  <Image
                    resizeMode="contain"
                    source={getLogo(n)}
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
                  <Ionicons
                    color={Colors.secondary_text}
                    name="chevron-forward-outline"
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
 * Exchange actions component styles.
 */
const styles = StyleSheet.create({
  // Container
  container: {flexDirection: 'row'},

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

export default withNavigation(ExchangeActions);
