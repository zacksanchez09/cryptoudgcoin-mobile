import React, {Component} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {Body, CheckBox, Container, Content, ListItem, Text} from 'native-base';
import {NeuButton} from 'react-native-neu-element';
import {CreditCardInput} from 'react-native-credit-card-input';
import AsyncStorage from '@react-native-community/async-storage';

import AppHeader from '../../components/AppHeader';
import InputWrapper from '../../components/InputWrapper';
import LoadingIndicator from '../../components/LoadingIndicator';
import SelectWallet from '../../components/SelectWallet';
import {WALLETS_URL} from '../../utils/API';

export default class WithdrawCardScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // Card info
      card: {},

      // Is loading wallets
      isLoading: true,

      // User wallets
      wallets: [],

      // Selected wallet
      selected: {},

      // Recharge quantity
      quantity: '',

      // Content height
      height: 0,
    };

    this.getWallets = this.getWallets.bind(this);
    this.onLayout = this.onLayout.bind(this);
    this.onChangeCard = this.onChangeCard.bind(this);
    this.onChangeWallet = this.onChangeWallet.bind(this);
    this.onChangeQuantity = this.onChangeQuantity.bind(this);
  }

  componentDidMount() {
    this.getWallets();
  }

  /**
   * Get User wallets.
   */
  async getWallets() {
    try {
      // Get user storaged info
      const user = JSON.parse(await AsyncStorage.getItem('user'));

      // Send "Get user wallets" request
      const response = await fetch(WALLETS_URL + user.id, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      // Get request result
      const result = await response.json();

      // Fill wallets info and stop loading wallets
      this.setState({wallets: result, selected: result[0], isLoading: false});
    } catch (error) {
      console.error('Fetch: ', error);
    }
  }

  /**
   * OnLayout Content container event.
   * @param {*} event - Event.
   */
  onLayout(event) {
    this.setState({height: event.nativeEvent.layout.height});
  }

  /**
   * OnChange Card info event.
   * @param {*} card - Card info.
   */
  onChangeCard(card) {
    this.setState({card});
  }

  /**
   * OnChange Wallet item event.
   * @param {*} wallet . Wallet item.
   */
  onChangeWallet(wallet) {
    this.setState({selected: wallet});
  }

  /**
   * OnChangeText Quantity event.
   * @param {*} quantity - Transfer quantity.
   */
  onChangeQuantity(quantity) {
    this.setState({quantity});
  }

  render() {
    // Get screen state
    const {height, isLoading, quantity, selected, wallets} = this.state;

    // Get selected item info
    const {name, description} = selected;

    return (
      <Container>
        {/* Screen header */}
        <AppHeader title="Retira a tarjeta" hasBack />

        {/* Screen content */}
        <Content
          showsVerticalScrollIndicator={false}
          onLayout={this.onLayout}
          padder
          style={styles.content}>
          <View style={styles.card}>
            <CreditCardInput
              allowScroll={true}
              inputContainerStyle={styles.cardInputContainer}
              inputStyle={[styles.text, styles.cardInput]}
              labels={{
                expiry: 'Expira',
                number: 'Número de tarjeta',
                cvc: 'CVC',
              }}
              requireName={true}
              name="Jesus"
              fontFamily="Roboto"
              cardScale={0.75}
              cardImageFront={require('../../assets/images/card-front.png')}
              cardImageBack={require('../../assets/images/card-back.png')}
              labelStyle={[styles.text, styles.cardLabel]}
              onChange={this.onChangeCard}
              placeholderColor="#9e9e9e"
              placeholders={{
                expiry: 'MM/YY',
                number: '**** **** **** ****',
                cvc: 'CVC',
              }}
            />
          </View>

          <ListItem style={styles.save}>
            <CheckBox color="#1da7ff" checked={false} />

            <Body>
              <Text style={[styles.text, styles.label]}>
                Guardar esta tarjeta
              </Text>
            </Body>
          </ListItem>

          {isLoading ? (
            <LoadingIndicator />
          ) : (
            <>
              <SelectWallet
                height={height}
                label="Selecciona un monedero"
                onPress={this.onChangeWallet}
                selected={selected}
                wallets={wallets}
              />

              <InputWrapper label="Cantidad">
                <View style={styles.wrapper}>
                  <TextInput
                    keyboardType="number-pad"
                    placeholder="0.00"
                    placeholderTextColor="#9e9e9e"
                    style={[styles.text, styles.input]}
                    value={quantity}
                  />

                  <Text style={styles.text}>USD</Text>
                </View>
              </InputWrapper>

              <InputWrapper label="Retirar monto">
                <View style={styles.wrapper}>
                  <TextInput
                    editable={false}
                    placeholder="0.00"
                    placeholderTextColor="#9e9e9e"
                    keyboardType="number-pad"
                    style={[styles.text, styles.input]}
                  />

                  <Text style={styles.text}>
                    {name === 'MXN' ? name : description}
                  </Text>
                </View>
              </InputWrapper>

              <NeuButton
                borderRadius={64}
                color="#FFFFFF"
                height={42}
                style={styles.button}
                width={160}>
                <Text style={[styles.text, styles.submit]}>Retirar fondos</Text>
              </NeuButton>
            </>
          )}
        </Content>
      </Container>
    );
  }
}

/**
 * Add fund card screen styles.
 */
const styles = StyleSheet.create({
  // Screen container
  container: {flex: 1},

  // Screen content
  content: {backgroundColor: '#FFF'},

  // Text style
  text: {color: '#2e3342', fontFamily: 'Heebo-Regular'},

  // Card info container
  card: {alignItems: 'center', maxHeight: 240},

  // Card input container
  cardInputContainer: {
    borderBottomWidth: 0,
    borderBottomColor: 'black',
  },

  // Card input
  cardInput: {
    backgroundColor: '#EEE',
    borderRadius: 24,
    fontSize: 12,
    height: 42,
    marginVertical: 10,
    paddingHorizontal: 15,
  },

  // Card label
  cardLabel: {
    color: '#1da7ff',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },

  // Save card input
  save: {borderBottomWidth: 0},

  // Save card input label
  label: {fontSize: 14, letterSpacing: 0.25},

  // Input wrapper
  wrapper: {alignItems: 'center', flex: 1, flexDirection: 'row', height: 42},

  // Input
  input: {fontSize: 16, flex: 1},

  // Button
  button: {alignSelf: 'center', marginTop: 15, marginBottom: 10},

  // Submit button text
  submit: {fontSize: 14, letterSpacing: 1.25},
});
