import React from 'react';
import {
  Alert,
  Clipboard,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {Container, Content} from 'native-base';
import {NeuButton, NeuView} from 'react-native-neu-element';
import AsyncStorage from '@react-native-community/async-storage';
import QRCode from 'react-native-qrcode-svg';
import Icon from 'react-native-vector-icons/FontAwesome';

import AppHeader from '../components/AppHeader';
import InputWrapper from '../components/InputWrapper';
import LoadingIndicator from '../components/LoadingIndicator';
import SelectWallet from '../components/SelectWallet';
import {WALLETS_URL} from '../utils/API';
import Colors from '../utils/Colors';

export default class ReceiveScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // Is loading wallets?
      isLoading: true,

      // Wallets list
      wallets: [],

      // Selected wallet
      wallet: {},

      // Content height
      height: 0,

      // Quantity
      quantity: '',

      // URI
      uri: '89djhKUGYAATdsBIDA&Si&DS&ATasd',

      // Notes
      note: '',
    };

    this.getWallets = this.getWallets.bind(this);
    this.onLayout = this.onLayout.bind(this);
    this.onChangeWallet = this.onChangeWallet.bind(this);
    this.onChangeQuantity = this.onChangeQuantity.bind(this);
    this.onPressURI = this.onPressURI.bind(this);
    this.onChangeNote = this.onChangeNote.bind(this);
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

      // Set wallets list and selected wallet, and stop loading wallets
      this.setState({wallets: result, wallet: result[0], isLoading: false});
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
   * OnChange Selected wallet event.
   * @param {*} wallet - Selected wallet.
   */
  onChangeWallet(wallet) {
    this.setState({wallet});
  }

  /**
   * OnChangeText Quantity input event.
   * @param {number} quantity - Quantity.
   */
  onChangeQuantity(quantity) {
    this.setState({quantity});
  }

  onPressURI() {
    Clipboard.setString(this.state.uri);

    Alert.alert('URI', 'Se ha copiado el URI en su portapapeles');
  }

  /**
   * OnChangeText Note input event.
   * @param {string} note - Notes.
   */
  onChangeNote(note) {
    this.setState({note});
  }

  render() {
    // Get screen state
    const {height, isLoading, quantity, uri, wallet, wallets} = this.state;

    return (
      <Container>
        {/* Screen header */}
        <AppHeader hasBack nested={true} title="Solicitud para recibir" />

        {/* Screen content */}
        <Content onLayout={this.onLayout} padder style={styles.content}>
          {isLoading ? (
            <LoadingIndicator />
          ) : (
            <>
              <SelectWallet
                label="Elige un monedero"
                height={height}
                selected={wallet}
                onPress={this.onChangeWallet}
                wallets={wallets}
              />

              <InputWrapper label="Cantidad">
                <View style={[styles.wrapper, styles.normal]}>
                  <TextInput
                    autoCapitalize="none"
                    keyboardType="numeric"
                    onChangeText={this.onChangeQuantity}
                    placeholder="0.00"
                    placeholderTextColor="#9e9e9e"
                    style={[styles.text, styles.input]}
                    value={quantity}
                  />

                  <Text style={styles.text}>
                    {wallet.name === 'MXN' || wallet.name === 'UDGC'
                      ? wallet.name
                      : wallet.name}
                  </Text>
                </View>
              </InputWrapper>

              <NeuView
                borderRadius={12}
                color="#FFFFFF"
                containerStyle={styles.code}
                height={125}
                style={styles.qr}
                width={125}>
                <QRCode
                  backgroundColor="#FFF"
                  color="#2e3342"
                  size={100}
                  value={uri}
                />
              </NeuView>

              <InputWrapper height={48}>
                <View style={[styles.wrapper, styles.copy]}>
                  <TextInput
                    editable={false}
                    style={[styles.text, styles.input]}
                    value={uri}
                  />

                  <NeuButton
                    borderRadius={8}
                    color="#fcf9f0"
                    height={32}
                    onPress={this.onPressURI}
                    width={32}>
                    <Icon color="#9e9e9e" name="copy" size={18} />
                  </NeuButton>
                </View>
              </InputWrapper>

              <InputWrapper label="Nota (opcional)" height={75}>
                <TextInput
                  autoCapitalize="none"
                  keyboardType="default"
                  onChangeText={this.onChangeNote}
                  multiline
                  placeholder="Incluir un mensaje al receptor"
                  placeholderTextColor="#9e9e9e"
                  style={[styles.text, styles.input]}
                  value={quantity}
                />
              </InputWrapper>

              {/* Submit button */}
              <NeuButton
                borderRadius={24}
                color="#FFFFFF"
                height={48}
                style={styles.button}
                width={200}>
                <Text style={[styles.text, styles.submit]}>Compartir</Text>
              </NeuButton>
            </>
          )}
        </Content>
      </Container>
    );
  }
}

/**
 * Add fund screen styles.
 */
const styles = StyleSheet.create({
  // Screen content
  content: {backgroundColor: '#fff'},

  // Loading content
  loading: {flex: 1, justifyContent: 'center', alignItems: 'center'},

  // Text style
  text: {color: Colors.primary_text, fontFamily: 'Heebo-Regular'},

  // QR code container
  qr: {alignSelf: 'center', marginVertical: 10},

  // QR code
  code: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  // Input wrapper
  wrapper: {alignItems: 'center', flex: 1, flexDirection: 'row', height: 42},

  // Normal input wrapper
  normal: {height: 42},

  // Copy input wrapper
  copy: {height: 48},

  // Input
  input: {flex: 1, fontSize: 12, letterSpacing: 0.25},

  // Button
  button: {alignSelf: 'center', marginTop: 15, marginBottom: 10},

  // Button text
  submit: {fontSize: 14, letterSpacing: 1.25},
});
