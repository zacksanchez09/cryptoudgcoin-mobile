import React from 'react';
import {Dimensions, StyleSheet, Text} from 'react-native';
import {NeuView} from 'react-native-neu-element';

import Colors from '../utils/Colors';

export default function InputWrapper({
  children,
  height = 42,
  inputStyle = styles.input,
  label = '',
  labelStyle = styles.label,
  width = Dimensions.get('window').width - 50,
}) {
  return (
    <>
      {/* Input label */}
      {label !== '' && <Text style={labelStyle}>{label}</Text>}

      {/* Input wrapper */}
      <NeuView
        borderRadius={24}
        color="#fcf9f0"
        containerStyle={{...styles.container, width}}
        height={height}
        inset
        style={inputStyle}
        width={width}>
        {children}
      </NeuView>
    </>
  );
}

/**
 * Input wrapper component styles.
 */
const styles = StyleSheet.create({
  // Container
  container: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 15,
  },

  // Input label
  label: {
    color: Colors.primary,
    fontFamily: 'Heebo-Regular',
    fontSize: 16,
    letterSpacing: 0.5,
    marginLeft: 15,
    marginTop: 5,
    marginBottom: 5,
  },

  // Input
  input: {alignSelf: 'center', marginVertical: 5},
});
