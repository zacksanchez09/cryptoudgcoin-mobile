import React from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {NeuButton} from 'react-native-neu-element';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';

import InputWrapper from './InputWrapper';
import Colors from '../utils/Colors';
import {CURRENCIES} from '../utils/Constants';

export default function SelectCurrency({selected, onPress}) {
  // Is modal visible?
  const [isVisible, setVisible] = React.useState(false);

  return (
    <>
      <InputWrapper height={48} label="Selecciona una criptomoneda">
        <View style={styles.wrapper}>
          {/* Selected coin image */}
          <Image
            resizeMode="contain"
            source={selected.image}
            style={styles.logo}
          />

          {/* Selected currency name */}
          <TextInput
            editable={false}
            style={[styles.text, styles.input]}
            value={selected.name}
          />

          {/* Change currency button */}
          <NeuButton
            borderRadius={12}
            color="#EAEDF2"
            height={32}
            onPress={() => setVisible(true)}
            width={32}>
            <Icon color="#9e9e9e" name="chevron-down" size={18} />
          </NeuButton>
        </View>
      </InputWrapper>

      {/* Change currency modal */}
      <Modal
        animationIn="bounceInUp"
        animationOut="bounceOutDown"
        isVisible={isVisible}
        onBackButtonPress={() => setVisible(false)}
        onBackdropPress={() => setVisible(false)}
        onDismiss={() => setVisible(false)}>
        <View style={styles.modal}>
          <View style={styles.header}>
            {/* Change currency label */}
            <Text style={[styles.text, styles.title]}>
              Selecciona una criptomoneda
            </Text>

            {/* Cancel button */}
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
            {CURRENCIES.map((item, index) => (
              <NeuButton
                key={`currency-${index}`}
                borderRadius={12}
                color="#FFFFFF"
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
                {/* Currency info */}
                <View style={styles.info}>
                  {/* Currency image */}
                  <Image
                    resizeMode="contain"
                    source={item.image}
                    style={styles.logo}
                  />

                  {/* Currency name */}
                  <Text style={[styles.text, styles.name]}>{item.name}</Text>
                </View>

                {/* Select currency button */}
                <Icon color="#9E9E9E" name="chevron-right" size={21} />
              </NeuButton>
            ))}
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
  // InputWrapper
  wrapper: {alignItems: 'center', flex: 1, height: 48, flexDirection: 'row'},

  // Currency logo
  logo: {height: 32, marginRight: 10, width: 32},

  // Text
  text: {color: Colors.primary_text, fontFamily: 'Heebo-Regular'},

  // Text input
  input: {flex: 1, fontSize: 14, letterSpacing: 0.25},

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

  // Currency option
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },

  // Currency item
  item: {alignSelf: 'center', marginVertical: 5},

  // Currency info
  info: {alignItems: 'center', flexDirection: 'row'},

  // Currency name
  name: {fontSize: 14, letterSpacing: 0.25},
});
