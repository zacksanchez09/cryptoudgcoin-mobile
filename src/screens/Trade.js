import React, {Component} from 'react';
import {Alert, StyleSheet, Text, TextInput, View} from 'react-native';
import {Container, Content, Icon} from 'native-base';
import {NeuButton} from 'react-native-neu-element';
import AsyncStorage from '@react-native-community/async-storage';

import AppHeader from '../components/AppHeader';
import InputWrapper from '../components/InputWrapper';
import LoadingIndicator from '../components/LoadingIndicator';
import SelectWallet from '../components/SelectWallet';
import {TRADE_URL, WALLETS_URL} from '../utils/API';

export default class TradeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // Is loading info?
      isLoading: true,

      // Wallets list
      wallets: [],

      // Origin wallet quantity
      originQuantity: '',

      // Origin wallet
      originWallet: {},

      // Destination wallet quantity
      destinationQuantity: '',

      // Destination wallet
      destinationWallet: {},

      // Content height
      height: 0,

      //nip
      nip: '',
    };

    // Bind methods
    this.getWallets = this.getWallets.bind(this);
    this.onLayout = this.onLayout.bind(this);
    this.onChangeOriginQuantity = this.onChangeOriginQuantity.bind(this);
    this.onChangeOriginWallet = this.onChangeOriginWallet.bind(this);
    this.onChangeDestinationWallet = this.onChangeDestinationWallet.bind(this);
    this.calculateQuantity = this.calculateQuantity.bind(this);
    this.swapWallets = this.swapWallets.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeNIP = this.onChangeNIP.bind(this);
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
      this.setState({
        wallets: result,
        originWallet: result[0],
        destinationWallet: result[1],
        isLoading: false,
      });
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

  onChangeOriginQuantity(originQuantity) {
    this.setState({originQuantity}, this.calculateQuantity);
  }

  onChangeNIP(nip) {
    this.setState({
      nip: nip.replace(/[^0-9]/g, ''),
    });
  }

  onChangeOriginWallet(originWallet) {
    this.setState({originWallet});
  }

  onChangeDestinationWallet(destinationWallet) {
    this.setState({destinationWallet});
  }

  calculateQuantity() {
    // Get component state
    const {originWallet, originQuantity} = this.state;

    let destinationQuantity = 0;
    if (originQuantity > 0) {
      if (originWallet.name === 'MXN') {
        destinationQuantity = (parseFloat(originQuantity) * 1).toFixed(2);
      } else {
        destinationQuantity = (parseFloat(originQuantity) * 1).toFixed(2);
      }
    }

    this.setState({destinationQuantity});
  }

  swapWallets() {
    // Get component state
    const {
      destinationQuantity,
      destinationWallet,
      originQuantity,
      originWallet,
    } = this.state;

    this.setState(
      {
        originWallet: destinationWallet,
        destinationWallet: originWallet,
        destinationQuantity: originQuantity,
        originQuantity: destinationQuantity,
      },
      this.calculateQuantity,
    );
  }

  async onSubmit() {
    // Get component state
    const {originQuantity, originWallet, nip} = this.state;

    if (parseFloat(originQuantity) > parseFloat(originWallet.balance)) {
      Alert.alert(
        'Canjear',
        'La cantidad a canjear es mayor al saldo disponible',
      );
    } else {
      const user = JSON.parse(await AsyncStorage.getItem('user'));

      const body = new FormData();
      body.append('user_id', user.id);
      body.append('quantity', originQuantity);
      body.append('coin', originWallet.name);
      body.append('nip', nip);

      const response = await fetch(TRADE_URL, {
        method: 'POST',
        body,
      });

      if (response.status === 200) {
        const result = await response.json();

        if (result.message === 'Successfully exchanged.') {
          Alert.alert(
            'Canjear',
            'El saldo se ha intercambiado exitosamente',
            [{text: 'OK', onPress: () => this.props.navigation.pop()}],
            {onDismiss: () => this.props.navigation.pop()},
          );
        } else {
          Alert.alert(
            'Canjear',
            result.message,
            [{text: 'OK', onPress: () => this.props.navigation.pop()}],
            {onDismiss: () => this.props.navigation.pop()},
          );
        }
      } else {
        console.log(await response.text());
      }
    }
  }

  render() {
    // Get screen state
    const {
      originQuantity,
      height,
      isLoading,
      originWallet,
      destinationWallet,
      destinationQuantity,
      wallets,
      nip,
    } = this.state;

    return (
      <Container>
        {/* Screen header */}
        <AppHeader hasBack nested={true} title="Intercambio de Monedas" />

        {/* Screen content */}
        <Content onLayout={this.onLayout} padder style={styles.content}>
          {isLoading ? (
            <LoadingIndicator />
          ) : (
            <>
              <SelectWallet
                label="Cantidad a cambiar"
                height={height}
                selected={originWallet}
                onPress={this.onChangeOriginWallet}
                wallets={wallets}
              />

              <InputWrapper>
                <View style={styles.wrapper}>
                  <TextInput
                    autoCapitalize="none"
                    keyboardType="numeric"
                    onChangeText={this.onChangeOriginQuantity}
                    placeholder="0.00"
                    placeholderTextColor="#9e9e9e"
                    style={[styles.text, styles.quantity]}
                    value={originQuantity}
                  />

                  <Text style={styles.text}>{originWallet.name}</Text>
                </View>
              </InputWrapper>

              <NeuButton
                borderRadius={12}
                color="#FFFFFF"
                concave
                height={48}
                onPress={this.swapWallets}
                style={{alignSelf: 'center', marginVertical: 10}}
                width={48}>
                <Icon
                  name="swap"
                  type="AntDesign"
                  style={{color: '#d6b14b', fontSize: 32}}
                />
              </NeuButton>

              <InputWrapper label="Cantidad a obtener">
                <View style={styles.wrapper}>
                  <TextInput
                    autoCapitalize="none"
                    editable={false}
                    keyboardType="numeric"
                    placeholder="0.00"
                    placeholderTextColor="#9e9e9e"
                    style={[styles.text, styles.quantity]}
                    value={destinationQuantity}
                  />

                  <Text style={styles.text}>{destinationWallet.name}</Text>
                </View>
              </InputWrapper>

              <SelectWallet
                height={height}
                selected={destinationWallet}
                onPress={this.onChangeDestinationWallet}
                wallets={wallets}
              />

              <View style={{height: 30}} />

              <InputWrapper label="Ingresa NIP para confirmar transacción">
                <View style={styles.wrapper}>
                  <TextInput
                    autoCapitalize="none"
                    keyboardType="numeric"
                    secureTextEntry={true}
                    onChangeText={this.onChangeNIP}
                    placeholderTextColor="#9e9e9e"
                    style={[styles.text, styles.quantity]}
                    value={nip}
                    maxLength={4}
                  />
                </View>
              </InputWrapper>

              {/* Submit button */}
              <NeuButton
                borderRadius={12}
                color="#FFFFFF"
                height={48}
                onPress={() => this.onSubmit()}
                style={styles.button}
                width={200}>
                <Text style={[styles.text, styles.submit]}>
                  Realizar intercambio
                </Text>
              </NeuButton>
            </>
          )}
        </Content>
      </Container>
    );
  }
}

/**
 * Trade screen styles.
 */
const styles = StyleSheet.create({
  // Screen container
  container: {flex: 1},

  // Screen content
  content: {backgroundColor: '#fff'},

  // Loading content
  loading: {flex: 1, justifyContent: 'center', alignItems: 'center'},

  // Input wrapper
  wrapper: {alignItems: 'center', flex: 1, flexDirection: 'row', height: 42},

  // Text style
  text: {color: '#2e3342', fontFamily: 'Heebo-Regular'},

  // Wallet picker
  wallet: {width: '100%'},

  // Currency sign
  sign: {fontSize: 14},

  // Quantity input
  quantity: {flex: 1, fontSize: 16},

  // Coin input
  coin: {maxWidth: 100},

  // Button
  button: {alignSelf: 'center', marginTop: 25, marginBottom: 10},

  // Button text
  submit: {fontSize: 14, letterSpacing: 1.25},
});
