import React, {Component} from 'react';
import {Alert, StyleSheet, TextInput, View} from 'react-native';
import {Container, Content, Text} from 'native-base';
import {NeuButton} from 'react-native-neu-element';
import AsyncStorage from '@react-native-community/async-storage';

import AppHeader from '../../components/AppHeader';
import InputWrapper from '../../components/InputWrapper';
import LoadingIndicator from '../../components/LoadingIndicator';
import SelectWallet from '../../components/SelectWallet';
import {
  CONEKTA_CARD_PAYMENT_URL,
  CONEKTA_OXXO_PAYMENT_URL,
  WALLETS_URL,
} from '../../utils/API';
import Colors from '../../utils/Colors';

export default class AddFundsOxxoScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // Is loading wallets
      isLoadingWallets: true,

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
    this.onChangeWallet = this.onChangeWallet.bind(this);
    this.onChangeQuantity = this.onChangeQuantity.bind(this);
    this.onPressSubmit = this.onPressSubmit.bind(this);
    this.goHome = this.goHome.bind(this);
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
      const response = await fetch(WALLETS_URL + user.id);

      if (response.status === 200) {
        // Get request result
        const result = await response.json();

        // Fill wallets info and stop loading wallets
        this.setState({
          wallets: result,
          selected: result[0],
          isLoadingWallets: false,
        });
      }
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

  selectCard(selected_card) {
    this.setState({selected_card});
  }

  onPressSubmit() {
    const {quantity} = this.state;

    if (parseFloat(quantity) <= 0) {
      Alert.alert('Recarga con OXXO', 'Ingresa una cantidad mayor a cero');
    } else {
      Alert.alert(
        'Recarga con OXXO',
        `¿Estás seguro que deseas realizar el cargo de $${quantity}?`,
        [
          {text: 'Cancelar', style: 'cancel'},
          {
            text: 'Aceptar',
            onPress: async () => {
              try {
                const user = JSON.parse(
                  (await AsyncStorage.getItem('user')) || 'null',
                );

                const body = new FormData();
                body.append('user_id', String(user.id));
                body.append('quantity', String(this.state.quantity));

                const response = await fetch(CONEKTA_OXXO_PAYMENT_URL, {
                  method: 'POST',
                  body,
                });

                if (response.status === 200) {
                  const result = await response.json();

                  this.props.navigation.navigate('AddFundsOxxoPay', {
                    oxxo_pay: result,
                  });
                } else {
                  Alert.alert(
                    'Recarga con OXXO',
                    'Hubo un problema para completar su recarga',
                  );
                }
              } catch (error) {
                Alert.alert(
                  'Recarga con OXXO',
                  'Hubo un problema para completar su recarga',
                );
              }
            },
          },
        ],
      );
    }
  }

  goHome() {
    this.props.navigation.pop(2);
  }

  render() {
    // Get screen state
    const {height, isLoadingWallets, quantity, selected, wallets} = this.state;

    return (
      <Container>
        {/* Screen header */}
        <AppHeader title="Recarga con OXXO" hasBack />

        {/* Screen content */}
        <Content
          showsVerticalScrollIndicator={false}
          onLayout={this.onLayout}
          padder
          style={styles.content}>
          {isLoadingWallets ? (
            <LoadingIndicator />
          ) : (
            <SelectWallet
              height={height}
              label="Selecciona un monedero"
              onPress={this.onChangeWallet}
              selected={selected}
              wallets={wallets}
            />
          )}

          <InputWrapper label="Cantidad">
            <View style={styles.wrapper}>
              <TextInput
                keyboardType="number-pad"
                onChangeText={this.onChangeQuantity}
                placeholder="0.00"
                placeholderTextColor="#9e9e9e"
                style={[styles.text, styles.input]}
                value={quantity}
              />

              <Text style={styles.text}>MXN</Text>
            </View>
          </InputWrapper>

          <NeuButton
            borderRadius={64}
            color="#FFFFFF"
            height={42}
            onPress={this.onPressSubmit}
            style={styles.button}
            width={160}>
            <Text style={[styles.text, styles.submit]}>Agregar fondos</Text>
          </NeuButton>
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
    backgroundColor: '#fcf9f0',
    borderRadius: 24,
    fontSize: 12,
    height: 42,
    marginVertical: 10,
    paddingHorizontal: 15,
  },

  // Card label
  cardLabel: {
    color: Colors.primary,
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
