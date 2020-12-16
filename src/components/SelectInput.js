import React from 'react';
import {Dimensions, StyleSheet, Text, TextInput, View} from 'react-native';
import {NeuButton} from 'react-native-neu-element';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';

import InputWrapper from './InputWrapper';
import Colors from '../utils/Colors';

export default function SelectInput({
  cancelable = true,
  defaultValue = 'Valor',
  items = [],
  label = undefined,
  onSelect,
  title = 'Selecciona un valor',
  width = Dimensions.get('window').width - 50,
  value,
}) {
  // Is modal visible?
  const [isVisible, setVisible] = React.useState(false);

  return (
    <>
      <InputWrapper height={48} label={label} width={width}>
        <View style={styles.wrapper}>
          {/* Selected value */}
          <TextInput
            editable={false}
            style={[
              styles.text,
              styles.input,
              value.name === defaultValue
                ? {color: Colors.secondary_text}
                : {color: Colors.primary_text},
            ]}
            value={value.name}
          />

          {/* Change button */}
          <NeuButton
            borderRadius={12}
            color="#EAEDF2"
            height={32}
            onPress={() => setVisible(true)}
            width={32}>
            <Icon color="#9E9E9E" name="chevron-down" size={18} />
          </NeuButton>
        </View>
      </InputWrapper>

      {/* Values modal */}
      <Modal
        animationIn="bounceInUp"
        animationOut="bounceOutDown"
        isVisible={isVisible}
        onBackButtonPress={() => setVisible(false)}
        onBackdropPress={() => setVisible(false)}
        onDismiss={() => setVisible(false)}>
        <View style={styles.modal}>
          <View style={styles.header}>
            {/* Label */}
            <Text style={[styles.text, styles.title]}>{title}</Text>
            {cancelable && (
              <View style={styles.button}>
                {/* Cancel button */}
                <NeuButton
                  borderRadius={12}
                  color="#FFFFFF"
                  height={32}
                  onPress={() => {
                    // Clear value
                    onSelect({id: 0, name: defaultValue});
                    // Hide modal
                    setVisible(false);
                  }}
                  width={32}>
                  <Icon color="#9E9E9E" name="eraser" size={14} />
                </NeuButton>

                <Text style={[styles.text, styles.cancel]}>Cancelar</Text>
              </View>
            )}
          </View>

          {/* Values list */}
          {items.map((item, index) => (
            <NeuButton
              key={`currency-${index}`}
              borderRadius={12}
              color="#FFFFFF"
              containerStyle={styles.container}
              height={48}
              onPress={() => {
                // Select value
                onSelect(item);
                // Hide modal
                setVisible(false);
              }}
              style={styles.item}
              width={Dimensions.get('window').width - 70}>
              {/* Value name */}
              <Text style={[styles.text, styles.name]}>{item.name}</Text>

              {/* Select value button */}
              <Icon color="#9E9E9E" name="chevron-right" size={21} />
            </NeuButton>
          ))}
        </View>
      </Modal>
    </>
  );
}

/**
 * Select input component styles.
 */
const styles = StyleSheet.create({
  // InputWrapper
  wrapper: {alignItems: 'center', flex: 1, flexDirection: 'row', height: 48},

  // Text
  text: {color: Colors.primary_text, fontFamily: 'Heebo-Regular'},

  // Text input
  input: {flex: 1, fontSize: 14, letterSpacing: 0.25},

  // Modal
  modal: {
    alignSelf: 'center',
    backgroundColor: Colors.background_primary,
    borderRadius: 12,
    padding: 20,
    width: Dimensions.get('window').width - 30,
  },

  // Header
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },

  // Modal title
  title: {
    color: Colors.secondary_text,
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },

  // Cancel button
  button: {alignItems: 'center', alignSelf: 'flex-end'},

  // Cancel button text
  cancel: {opacity: 0.5, marginTop: 5},

  // Values list item
  item: {alignSelf: 'center', marginVertical: 5},

  // Values list item container
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },

  // Values list item name
  name: {color: Colors.primary_text, fontSize: 14, letterSpacing: 0.25},
});
