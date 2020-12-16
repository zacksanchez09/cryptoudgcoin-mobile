import React, {Component} from 'react';
import {Alert, Dimensions, StyleSheet, TextInput, View} from 'react-native';
import {Button, Container, Content, Text} from 'native-base';
import {NeuButton, NeuView} from 'react-native-neu-element';
import {CreditCardInput} from 'react-native-credit-card-input';
import AsyncStorage from '@react-native-community/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';

import AppHeader from '../../components/AppHeader';
import InputWrapper from '../../components/InputWrapper';
import LoadingIndicator from '../../components/LoadingIndicator';
import SelectWallet from '../../components/SelectWallet';
import {
  CONEKTA_ADD_CARD_URL,
  CONEKTA_CARD_PAYMENT_URL,
  CONEKTA_GET_CARDS_BY_USER_ID_URL,
  WALLETS_URL,
} from '../../utils/API';
import Colors from '../../utils/Colors';

const INITIAL_CARD = {
  valid: false,
  values: {
    number: '',
    expiry: '',
    cvc: '',
    type: null,
  },
  status: {
    number: 'incomplete',
    expiry: 'incomplete',
    cvc: 'incomplete',
    name: 'incomplete',
  },
};

export default class AddFundsCardScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // Card info
      cards: [],
      card: INITIAL_CARD,
      isLoadingCards: true,
      selected_card: {id: 0},

      // Is loading wallets
      isLoadingWallets: true,

      // Is visible?
      isVisible: false,

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
    this.refresh = this.refresh.bind(this);
    this.onPressAddCard = this.onPressAddCard.bind(this);
    this.onPressCancel = this.onPressCancel.bind(this);
    this.onPressSubmit = this.onPressSubmit.bind(this);
    this.goHome = this.goHome.bind(this);
  }

  componentDidMount() {
    this.getCards();
    this.getWallets();
  }

  async getCards() {
    try {
      // Get user data
      const user = JSON.parse((await AsyncStorage.getItem('user')) || 'null');

      try {
        // Send request to server
        const response = await fetch(
          CONEKTA_GET_CARDS_BY_USER_ID_URL + user.id,
        );

        if (response.status === 200) {
          // Receive server response
          const result = await response.json();

          const cards = [];

          for (const value of Object.values(result[0])) {
            cards.push(value);
          }

          this.setState({
            isLoadingCards: false,
            cards,
            isVisible: cards.length === 0,
          });
        }
      } catch (error) {
        Alert.alert(
          'Tarjetas guardadas',
          'No se pudo obtener sus tarjetas guardadas, intente más tarde.',
        );

        this.setState({isLoadingCards: false});
      }
    } catch (error) {
      Alert.alert(
        'Tarjetas guardadas',
        'No se pudo obtener sus tarjetas guardadas, intente más tarde.',
      );
      this.setState({isLoadingCards: false});
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

  refresh(success = true) {
    if (success) {
      this.setState(
        {isLoadingCards: true, card: INITIAL_CARD, isVisible: false},
        this.getCards,
      );
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

  async onPressAddCard() {
    if (this.state.isVisible) {
      // Get card info
      const {status, valid, values} = this.state.card;
      // Get card values
      const {number, expiry, cvc, name} = values;

      // Get card number
      const cardNumber = number.split(' ').join('');
      // Get expiry
      const [expMonth, expYear] = expiry.split('/');

      if (valid) {
        try {
          const user = JSON.parse(
            (await AsyncStorage.getItem('user')) || 'null',
          );

          // eslint-disable-next-line no-undef
          const headers = new Headers();
          headers.append('Content-Type', 'application/x-www-form-urlencoded');

          // eslint-disable-next-line no-undef
          const body = new URLSearchParams();
          body.append('user_id', String(user.id));
          body.append('conekta_token_id', 'tok_test_visa_4242');

          const response = await fetch(CONEKTA_ADD_CARD_URL, {
            method: 'POST',
            headers,
            body: body.toString(),
          });

          if (response.status === 200) {
            const result = await response.json();

            if (result.source) {
              Alert.alert(
                'Agregar tarjeta',
                'Su tarjeta ha sido guardada con éxito',
                [{text: 'OK', onPress: () => this.refresh(true)}],
                {onDismiss: () => this.refresh(true)},
              );
            } else {
              Alert.alert(
                'Agregar tarjeta',
                'Hubo un problema al registrar su tarjeta, revise sus datos e intente de nuevo',
                [{text: 'OK', onPress: () => this.refresh(false)}],
                {onDismiss: () => this.refresh(false)},
              );
            }
          } else {
            Alert.alert(
              'Agregar tarjeta',
              'Hubo un problema al registrar su tarjeta, revise sus datos e intente de nuevo',
              [{text: 'OK', onPress: () => this.refresh(false)}],
              {onDismiss: () => this.refresh(false)},
            );
          }
        } catch (error) {
          Alert.alert(
            'Agregar tarjeta',
            'Hubo un problema al registrar su tarjeta, revise sus datos e intente de nuevo',
            [{text: 'OK', onPress: () => this.refresh(false)}],
            {onDismiss: () => this.refresh(false)},
          );
        }
      } else if (status.number === 'invalid') {
        Alert.alert('Agregar tarjeta', 'El número ingresado es inválido');
      } else if (status.number === 'incomplete') {
        Alert.alert('Agregar tarjeta', 'Ingresa el número de la tarjeta');
      } else if (status.expiry === 'invalid') {
        Alert.alert('Agregar tarjeta', 'La fecha de expiración es inválida.');
      } else if (status.expiry === 'incomplete') {
        Alert.alert(
          'Agregar tarjeta',
          'Ingresa la fecha de expiración de la tarjeta',
        );
      } else if (status.cvc === 'invalid') {
        Alert.alert(
          'Agregar tarjeta',
          'El código de verificación de la tarjeta es inválido.',
        );
      } else if (status.cvc === 'incomplete') {
        Alert.alert(
          'Agregar tarjeta',
          'Ingresa el código de verificación de la tarjeta',
        );
      } else if (status.name === 'incomplete') {
        Alert.alert(
          'Agregar tarjeta',
          'Ingrese el nombre del propietario de la tarjeta',
        );
      }
    } else {
      this.setState({isVisible: true});
    }
  }

  onPressCancel() {
    this.setState({isVisible: false, card: INITIAL_CARD});
  }

  selectCard(selected_card) {
    this.setState({selected_card});
  }

  onPressSubmit() {
    const {selected_card, quantity} = this.state;

    if (parseFloat(quantity) <= 0) {
      Alert.alert('Recarga con tarjeta', 'Ingresa una cantidad mayor a cero');
    } else if (selected_card.id === 0) {
      Alert.alert('Recarga con tarjeta', 'Selecciona una tarjeta');
    } else {
      Alert.alert(
        'Recargar con tarjeta',
        `¿Estás seguro que deseas realizar el cargo de $${quantity} con la tarjeta con terminación ${
          selected_card.last4
        }?`,
        [
          {text: 'Cancelar', style: 'cancel'},
          {
            text: 'Aceptar',
            onPress: async () => {
              try {
                const user = JSON.parse(
                  (await AsyncStorage.getItem('user')) || 'null',
                );

                // eslint-disable-next-line no-undef
                const headers = new Headers();
                headers.append(
                  'Content-Type',
                  'application/x-www-form-urlencoded',
                );

                // eslint-disable-next-line no-undef
                const body = new URLSearchParams();
                body.append('user_id', String(user.id));
                body.append('quantity', String(this.state.quantity));
                body.append('conekta_token_id', 'tok_test_visa_4242');

                const response = await fetch(CONEKTA_CARD_PAYMENT_URL, {
                  method: 'POST',
                  headers,
                  body: body.toString(),
                });

                if (response.status === 200) {
                  const result = await response.json();

                  if (result.order.payment_status === 'paid') {
                    Alert.alert(
                      'Recarga con tarjeta',
                      'La recarga se ha realizado con éxito',
                      [{text: 'OK', onPress: this.goHome}],
                      {onDismiss: this.goHome},
                    );
                  } else {
                    Alert.alert(
                      'Recarga con tarjeta',
                      'Hubo un problema para completar su recarga',
                    );
                  }
                } else {
                  Alert.alert(
                    'Recarga con tarjeta',
                    'Hubo un problema para completar su recarga',
                  );
                }
              } catch (error) {
                console.log('Error al recargar', error);
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
    const {
      cards,
      height,
      isLoadingCards,
      isLoadingWallets,
      isVisible,
      quantity,
      selected,
      selected_card,
      wallets,
    } = this.state;

    // Get selected item info
    const {name} = selected;

    return (
      <Container>
        {/* Screen header */}
        <AppHeader title="Recarga desde tarjeta" hasBack />

        {/* Screen content */}
        <Content
          showsVerticalScrollIndicator={false}
          onLayout={this.onLayout}
          padder
          style={styles.content}>
          {isVisible ? (
            <>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  paddingLeft: 15,
                  paddingBottom: 15,
                }}>
                Nueva tarjeta
              </Text>

              <View style={styles.card}>
                <CreditCardInput
                  allowScroll={true}
                  cardImageBack={require('../../assets/images/card-back.png')}
                  cardImageFront={require('../../assets/images/card-front.png')}
                  cardScale={0.75}
                  fontFamily="Roboto"
                  inputContainerStyle={styles.cardInputContainer}
                  inputStyle={[styles.text, styles.cardInput]}
                  labels={{
                    expiry: 'Expira',
                    number: 'Número de tarjeta',
                    cvc: 'CVC',
                    name: 'Nombre del propietario',
                  }}
                  labelStyle={[styles.text, styles.cardLabel]}
                  onChange={this.onChangeCard}
                  placeholderColor="#9e9e9e"
                  placeholders={{
                    name: 'Nombre',
                    expiry: 'MM/YY',
                    number: '**** **** **** ****',
                    cvc: 'CVC',
                  }}
                  requiresName
                />
              </View>

              <NeuButton
                borderRadius={64}
                color="#FFFFFF"
                height={42}
                onPress={this.onPressAddCard}
                style={styles.button}
                width={160}>
                <Text style={[styles.text, styles.submit]}>
                  Agregar tarjeta
                </Text>
              </NeuButton>

              <Button
                onPress={this.onPressCancel}
                style={{alignSelf: 'center'}}
                transparent>
                <Text style={{color: Colors.secondary_text}}>Cancelar</Text>
              </Button>
            </>
          ) : (
            <>
              <Text
                style={{
                  fontWeight: 'bold',
                  paddingLeft: 15,
                  paddingBottom: 5,
                  fontSize: 16,
                }}>
                Mis tarjetas
              </Text>

              <Text
                style={{
                  color: Colors.primary,
                  fontFamily: 'Heebo-Regular',
                  fontSize: 16,
                  letterSpacing: 0.5,
                  marginLeft: 15,
                  marginTop: 5,
                  marginBottom: 5,
                }}>
                Selecciona una tarjeta
              </Text>

              {isLoadingCards ? (
                <LoadingIndicator />
              ) : cards.length > 0 ? (
                <>
                  {cards.map((item, index) => (
                    <NeuButton
                      active={selected_card.id === item.id}
                      borderRadius={12}
                      color={Colors.background_primary}
                      containerStyle={{
                        alignItems: 'center',
                        alignSelf: 'center',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingHorizontal: 15,
                        paddingVertical: 15,
                        width: Dimensions.get('window').width - 30,
                      }}
                      key={`card-${index}`}
                      onPress={() => this.selectCard(item)}
                      height={72}
                      style={{alignSelf: 'center', marginVertical: 5}}
                      width={Dimensions.get('window').width - 30}>
                      {/* Wallet info section */}
                      <View
                        style={{
                          alignItems: 'center',
                          flexDirection: 'row',
                        }}>
                        {/* Wallet coin logo */}
                        <Ionicons
                          color={Colors.primary}
                          name="card-outline"
                          style={{marginRight: 10}}
                          size={32}
                        />

                        {/* Wallet coin info */}
                        <View>
                          {/* Wallet coin name */}
                          <Text
                            style={[
                              styles.text,
                              {fontFamily: 'Heebo-Medium', fontSize: 14},
                            ]}>
                            {`**** **** **** ${item.last4}`}
                          </Text>

                          {/* Wallet coin symbol */}
                          <Text
                            style={[
                              styles.text,
                              {fontSize: 12, textTransform: 'capitalize'},
                            ]}>
                            {item.brand}
                          </Text>
                        </View>
                      </View>

                      {selected_card.id === item.id && (
                        <View>
                          <NeuView color="#FFFFFF" height={32} width={32}>
                            <Ionicons
                              color={Colors.success}
                              name="checkmark-circle-outline"
                              size={21}
                            />
                          </NeuView>
                        </View>
                      )}

                      {/*
                          <View>
                            <NeuButton color="#FFFFFF" height={32} width={32}>
                              <Ionicons
                                color={Colors.error}
                                name="trash"
                                size={21}
                              />
                            </NeuButton>
                          </View>*/}
                    </NeuButton>
                  ))}
                </>
              ) : (
                <Text style={{textAlign: 'center'}}>
                  No hay tarjetas registradas
                </Text>
              )}

              <Button
                onPress={this.onPressAddCard}
                style={{alignSelf: 'center'}}
                transparent>
                <Text style={{color: Colors.secondary_text}}>
                  Agregar tarjeta
                </Text>
              </Button>

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
