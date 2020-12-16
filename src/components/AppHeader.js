import React from 'react';
import {StyleSheet, Text, Platform} from 'react-native';
import {Body, Header, Left, Right, Subtitle, Title} from 'native-base';

import BackButton from './BackButton';
import Colors from '../utils/Colors';

function AppHeader({
  hasBack = false,
  hasTitle = true,
  title = '',
  nested = false,
  goHome = false,
  right,
}) {
  return (
    <Header
      androidStatusBarColor="#d6b14b"
      iosBarStyle={Platform.select({
        android: 'light-content',
        ios: 'dark-content',
      })}
      style={styles.header}>
      {/* Header left */}
      <Left style={styles.side}>
        {/* Back button */}
        {hasBack && <BackButton goHome={goHome} nested={nested} />}
      </Left>

      {/* Header center */}
      <Body style={styles.center}>
        {/* Header title */}
        <Title style={styles.title}>
          <Text style={styles.blue}>Crypto</Text>
          <Text style={styles.white}>UDG</Text>
          <Text style={styles.blue}>Coin</Text>
        </Title>

        {/* Header subtitle */}
        {hasTitle && (
          <Subtitle style={[styles.title, styles.subtitle]}>{title}</Subtitle>
        )}
      </Body>

      {/* Header right */}
      <Right style={styles.side}>{right}</Right>
    </Header>
  );
}

/**
 * App Header component styles.
 */
const styles = StyleSheet.create({
  // Header
  header: {
    backgroundColor: Colors.background_primary,
    borderBottomColor: Colors.background_primary,
    borderBottomWidth: 0,
    elevation: 0,
  },

  // Header side
  side: {flex: 1},

  // Header center
  center: {flex: 5},

  // Title
  title: {alignSelf: 'center', fontFamily: 'Heebo-Medium', fontSize: 18},

  // White text
  white: {color: Colors.primary_text},

  // Blue text
  blue: {color: Colors.primary},

  // Subtitle
  subtitle: {color: Colors.secondary_text},
});

export default AppHeader;
