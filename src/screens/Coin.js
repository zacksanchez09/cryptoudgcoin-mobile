import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {Container, Content} from 'native-base';
import {LineChart, Grid} from 'react-native-svg-charts';

import AppHeader from '../components/AppHeader';

export default class CoinScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // Get selected coin info
    const coin = this.props.navigation.getParam('coin');

    // USD percent change and price
    const {
      percent_change_1h: change1h,
      percent_change_24h: change24h,
      percent_change_7d: change7d,
    } = coin.quote.USD;

    return (
      <Container>
        {/* Screen header */}
        <AppHeader title={coin.name} hasBack />

        {/* Screen content */}
        <Content padder style={styles.content}>
          {/* Coin percent change chart */}
          <LineChart
            contentInset={{top: 20, bottom: 20, left: 20, right: 20}}
            data={[change7d, change24h, change1h]}
            svg={{stroke: '#1da7ff'}}
            style={styles.chart}>
            <Grid svg={{stroke: 'rgba(0, 0, 0, 0.25)'}} />
          </LineChart>
        </Content>
      </Container>
    );
  }
}

/**
 * Prices screen styles.
 */
const styles = StyleSheet.create({
  // Screen content
  content: {backgroundColor: '#fff'},

  // Chart container
  chart: {
    height: Dimensions.get('window').height / 2.5,
    width: '100%',
  },
});
