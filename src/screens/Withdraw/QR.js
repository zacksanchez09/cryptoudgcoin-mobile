import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
  Alert,
} from 'react-native';
import {Button, Container, Content} from 'native-base';
import {NeuButton} from 'react-native-neu-element';
import Modal from 'react-native-modal';
import {RNCamera} from 'react-native-camera';
import {check, PERMISSIONS, request} from 'react-native-permissions';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';

import AppHeader from '../../components/AppHeader';
import InputWrapper from '../../components/InputWrapper';
import LoadingIndicator from '../../components/LoadingIndicator';
import SelectWallet from '../../components/SelectWallet';
import {TRANSFER_URL, USERS_URL, WALLETS_URL} from '../../utils/API';
import Colors from '../../utils/Colors';

export default class WithdrawQRScreen extends React.Component {
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

      // Concept
      concept: '',

      // Quantity
      quantity: '',

      // Scanned QR
      qr: '',

      // User
      receiver: {},

      // Is modal visible?
      isVisible: false,

      // Is flash active?
      flash: false,

      //nip
      nip: '',
    };

    this.getWallets = this.getWallets.bind(this);
    this.getPermissions = this.getPermissions.bind(this);
    this.onLayout = this.onLayout.bind(this);
    this.onChangeWallet = this.onChangeWallet.bind(this);
    this.onChangeConcept = this.onChangeConcept.bind(this);
    this.onChangeQuantity = this.onChangeQuantity.bind(this);
    this.showModal = this.showModal.bind(this);
    this.onRead = this.onRead.bind(this);
    this.getUser = this.getUser.bind(this);
    this.onPressSubmit = this.onPressSubmit.bind(this);
    this.onChangeNIP = this.onChangeNIP.bind(this);
  }

  componentDidMount() {
    this.getWallets();
    this.getPermissions();
  }

  async getPermissions() {
    // Validate OS
    if (Platform.OS === 'ios') {
      // Check device camera permission
      const result = await check(PERMISSIONS.IOS.CAMERA);

      if (result !== 'granted') {
        const granted = await request(PERMISSIONS.IOS.CAMERA);

        if (granted === 'denied' || granted === 'blocked') {
          Alert.alert(
            'Retiro rápido',
            'Necesitas habilitar los permisos para escanear códigos QR',
          );
        } else if (granted === 'unavailable') {
          Alert.alert(
            'Retiro rápido',
            'Este dispositivo no puede escanear códigos QR',
          );
        }
      }
    }
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

  onChangeConcept(concept) {
    this.setState({concept});
  }

  /**
   * OnChangeText Quantity input event.
   * @param {number} quantity - Quantity.
   */
  onChangeQuantity(quantity) {
    this.setState({quantity});
  }

  showModal(isVisible = true) {
    this.setState({isVisible});
  }

  onRead({data}) {
    this.setState({qr: data, isVisible: false}, () => this.getUser(data));
  }

  onChangeNIP(nip) {
    this.setState({
      nip: nip.replace(/[^0-9]/g, ''),
    });
  }

  async getUser(id) {
    try {
      const user = JSON.parse((await AsyncStorage.getItem('user')) || 'null');

      if (String(user.id) !== id) {
        const response = await fetch(`${USERS_URL}/${id}`);

        if (response.status === 200) {
          const result = await response.json();

          if (result.user) {
            this.setState({receiver: result.user}, () => this.showModal(false));
          } else {
            Alert.alert('Retiro rápido', 'Escanea un QR válido.');
          }
        } else {
          Alert.alert('Retiro rápido', 'Escanea un QR válido.');
        }
      } else {
        Alert.alert('Retiro rápido', 'Escanea un QR válido.');
      }
    } catch (error) {
      Alert.alert('Retiro rápido', 'Escanea un QR válido.');
    }
  }

  async onPressSubmit() {
    try {
      // Get component state
      const {concept, qr, quantity, receiver, wallet, nip} = this.state;

      // Get user info
      const user = JSON.parse((await AsyncStorage.getItem('user')) || 'null');

      // Validate form
      if (concept === '') {
        Alert.alert(
          'Retiro rápido',
          'El campo "Concepto" no puede estar vacío.',
        );
      } else if (!receiver.name) {
        Alert.alert(
          'Retiro rápido',
          'Escanea el código QR del usuario al que se realizará el retiro.',
        );
      } else if (quantity === '') {
        Alert.alert('Retiro rápido', 'Ingresa la cantidad de saldo a retirar.');
      } else if (nip === '') {
        Alert.alert('Retiro rápido', 'Ingresa el nip para validar el retiro.');
      } else if (user === null) {
        Alert.alert(
          'Retiro rápido',
          'Ocurrió un problema para acceder realizar el retiro.',
        );
      } else {
        const body = new FormData();
        body.append('from', user.id);
        body.append('to', qr);
        body.append('amount', quantity);
        body.append('coin', wallet.name);
        body.append('concept', concept);
        body.append('nip', nip);

        const response = await fetch(TRANSFER_URL, {
          method: 'POST',
          body,
        });

        if (response.status === 200) {
          const result = await response.json();

          if (result.message === 'Successfully transfered.') {
            Alert.alert(
              'Retiro realizado',
              'El retiro se ha realizado con éxito.',
              [{text: 'OK', onPress: () => this.props.navigation.pop()}],
              {onDismiss: () => this.props.navigation.pop()},
            );
          } else {
            Alert.alert('Retiro rápido', result.message);
          }
        } else {
          Alert.alert(
            'Retiro rápido',
            'Hubo un problema para realizar el retiro.',
          );
        }
      }
    } catch (error) {
      Alert.alert(
        'Retiro rápido',
        'Hubo un problema para realizar el retiro. Intente más tarde.',
      );
    }
  }

  render() {
    // Get screen state
    const {
      concept,
      flash,
      height,
      isLoading,
      isVisible,
      quantity,
      qr,
      receiver,
      wallet,
      wallets,
      nip,
    } = this.state;

    return (
      <Container>
        {/* Screen header */}
        <AppHeader hasBack nested={true} title="Retiro rápido" />

        {/* Screen content */}
        <Content
          onLayout={this.onLayout}
          padder
          showsVerticalScrollIndicator={false}
          style={styles.background}>
          {isLoading ? (
            <LoadingIndicator />
          ) : (
            <>
              {/* QR scanner input */}
              <NeuButton
                borderRadius={12}
                color="#FFFFFF"
                containerStyle={styles.scanner}
                height={125}
                onPress={this.showModal}
                style={styles.qr}
                width={125}>
                <Icon
                  color="#9e9e9e"
                  name={Platform.select({android: 'md-scan', ios: 'ios-scan'})}
                  size={120}
                />
              </NeuButton>

              {/* QR scanner input label */}
              <Text style={[styles.text, styles.label]}>
                {qr !== '' && receiver.name
                  ? 'Volver a escanear'
                  : 'Escanea el código QR'}
              </Text>

              {qr !== '' && receiver.name && (
                <View
                  style={{
                    margin: 15,
                    borderBottomWidth: 0.5,
                    borderBottomColor: '#444',
                  }}>
                  {/* Quantity input */}
                  <Text
                    style={{
                      color: Colors.primary,
                      fontWeight: 'bold',
                      fontSize: 16,
                      marginBottom: 5,
                    }}>
                    Usuario a retirar
                  </Text>

                  <Text
                    style={{
                      color: Colors.primary_text,
                      fontSize: 14,
                      marginBottom: 10,
                    }}>
                    {receiver.name} {receiver.last_name}
                  </Text>
                </View>
              )}

              {/* Select wallet input */}
              <SelectWallet
                label="Elige un monedero"
                height={height}
                selected={wallet}
                onPress={this.onChangeWallet}
                wallets={wallets}
              />

              {/* Quantity input */}
              <InputWrapper label="Concepto">
                <View style={styles.wrapper}>
                  <TextInput
                    blurOnSubmit={false}
                    placeholder="Concepto de envío"
                    onChangeText={this.onChangeConcept}
                    returnKeyType="next"
                    style={[styles.text, styles.input]}
                    value={concept}
                  />
                </View>
              </InputWrapper>

              {/* Quantity input */}
              <InputWrapper label="Cantidad">
                <View style={styles.wrapper}>
                  <TextInput
                    blurOnSubmit={false}
                    keyboardType="numeric"
                    onChangeText={this.onChangeQuantity}
                    placeholder="Cantidad a enviar"
                    returnKeyType="next"
                    style={[styles.text, styles.input]}
                    value={quantity}
                  />
                </View>
              </InputWrapper>

              <View style={{height: 30}} />

              <InputWrapper label="Ingresa NIP para confirmar retiro">
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
                borderRadius={24}
                color="#FFFFFF"
                height={48}
                onPress={this.onPressSubmit}
                style={styles.button}
                width={150}>
                <Text style={[styles.text, styles.submit]}>Retirar</Text>
              </NeuButton>

              <Modal
                hardwareAccelerated={true}
                isVisible={isVisible}
                onBackButtonPress={() => this.showModal(false)}
                onBackdropPress={() => this.showModal(false)}
                swipeDirection={['up', 'left', 'right', 'down']}
                style={{
                  alignSelf: 'center',
                  alignItems: 'center',
                  height: Dimensions.get('window').height / 1.2,
                  justifyContent: 'center',
                  width: Dimensions.get('window').width / 1.2,
                }}>
                <QRCodeScanner
                  cameraStyle={{height: '100%', width: '100%'}}
                  containerStyle={{height: '100%', width: '100%'}}
                  flashMode={
                    flash
                      ? RNCamera.Constants.FlashMode.torch
                      : RNCamera.Constants.FlashMode.off
                  }
                  markerStyle={{borderColor: '#fff'}}
                  onRead={this.onRead}
                  showMarker
                />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Button
                    onPress={() => this.showModal(false)}
                    style={{
                      backgroundColor: 'red',
                      flex: 1,
                      marginLeft: 10,
                      marginTop: 10,
                      justifyContent: 'center',
                    }}>
                    <Text style={styles.text}>Cerrar</Text>
                  </Button>

                  <Button
                    onPress={() => this.setState({flash: !flash})}
                    style={{
                      backgroundColor: '#e5e81c',
                      flex: 1,
                      marginLeft: 10,
                      marginTop: 10,
                      justifyContent: 'center',
                    }}>
                    <Icon
                      name="flashlight"
                      style={{marginRight: 10}}
                      type="Entypo"
                    />

                    <Text style={styles.text}>Flash</Text>
                  </Button>
                </View>
              </Modal>
            </>
          )}
        </Content>
      </Container>
    );
  }
}

/**
 * Withdraw QR screen styles.
 */
const styles = StyleSheet.create({
  // Screen background
  background: {backgroundColor: '#fff'},

  // Input wrapper
  wrapper: {alignItems: 'center', flex: 1, flexDirection: 'row', height: 42},

  // Text color
  text: {color: Colors.primary_text, fontFamily: 'Heebo-Regular'},

  // QR scanner label
  label: {
    color: Colors.primary,
    fontSize: 16,
    letterSpacing: 0.5,
    marginBottom: 15,
    textAlign: 'center',
  },

  // QR container
  qr: {alignSelf: 'center', marginVertical: 10},

  // QR Scanner
  scanner: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  // Quantity input
  quantity: {flex: 1, fontSize: 16},

  // Input
  input: {fontSize: 14, letterSpacing: 0.25, width: '100%'},

  // Submit button
  button: {alignSelf: 'center', marginTop: 15, marginBottom: 10},

  // Submit button text
  submit: {fontSize: 14, letterSpacing: 1.25},

  // Transparent button
  transparent: {alignSelf: 'center'},
});
