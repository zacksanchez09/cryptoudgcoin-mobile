import React, {Component} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Container, Content} from 'native-base';

import AppHeader from '../components/AppHeader';
import Currency from '../components/Currency';
import LoadingIndicator from '../components/LoadingIndicator';
import {PRICES_URL} from '../utils/API';
import {APP_LOGO} from '../utils/Constants';

export default class PricesScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // Coins list
      coins: [],
      // Is loading info?
      isLoading: true,
    };

    this.getCoins = this.getCoins.bind(this);
    this.onPressCoin = this.onPressCoin.bind(this);
  }

  componentDidMount() {
    this.getCoins();
  }

  /**
   * Get coins info.
   */
  async getCoins() {
    try {
      const response = await fetch(PRICES_URL);

      if (response.status === 200) {
        // Get request result
        const result = await response.json();

        // Update state
        this.setState({coins: result.coins, isLoading: false});
      } else {
        this.setState({isLoading: false});
      }
    } catch (error) {
      this.setState({isLoading: false});
    }
  }

  /**
   * OnPress Coin event.
   *
   * Redirects to Coin screen.
   *
   * @param {*} coin - Selected coin.
   */
  onPressCoin(coin) {
    this.props.navigation.navigate('Coin', {coin});
  }

  render() {
    return (
      <Container>
        {/* Screen header */}
        <AppHeader title="Top 10 Criptomonedas" />

        {/* Screen content */}
        <Content
          contentContainerStyle={styles.container}
          style={styles.content}>
          {/* Cryptocurrency list */}
          {this.state.isLoading ? (
            <View style={styles.loading}>
              <LoadingIndicator />
            </View>
          ) : (
            <>
              <Currency
                coin={{
                  name: 'CryptoUDGCoin',
                  logo: APP_LOGO,
                  symbol: 'TWC',
                  quote: {
                    USD: {
                      percent_change_1h: 12,
                      percent_change_24h: 8,
                      percent_change_7d: 4,
                      price: '0.050',
                    },
                  },
                }}
                onPress={() => {}}
              />

              <ScrollView
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}>
                {this.state.coins.map((coin, index) => (
                  <Currency
                    key={`cryptos-${index}`}
                    coin={coin}
                    onPress={() => this.onPressCoin(coin)}
                  />
                ))}
              </ScrollView>
            </>
          )}
        </Content>
      </Container>
    );
  }
}

/**
 * Prices screen styles.
 */
const styles = StyleSheet.create({
  // Screen container
  container: {flex: 1},

  // Screen content
  content: {backgroundColor: '#FFF'},

  // Loading content
  loading: {flex: 1, justifyContent: 'center', alignItems: 'center'},

  // Currency list
  list: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});
