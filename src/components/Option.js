import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {NeuButton} from 'react-native-neu-element';
import Icon from 'react-native-vector-icons/FontAwesome';

import Colors from '../utils/Colors';

export default function Option({
  description = null,
  icon = null,
  name = '',
  onPress = () => {},
  width = Dimensions.get('window').width - 30,
}) {
  return (
    <NeuButton
      borderRadius={12}
      color="#FFFFFF"
      containerStyle={styles.content}
      height={icon ? 56 : 48}
      onPress={onPress}
      style={styles.container}
      width={width}>
      {/* Option info */}
      <View style={styles.info}>
        {/* Option icon */}
        {icon && <View style={styles.icon}>{icon}</View>}

        <View>
          {/* Option name */}
          <Text style={styles.text}>{name}</Text>

          {/* Option description */}
          {description && <Text style={styles.text}>{description}</Text>}
        </View>
      </View>

      {/* Link icon */}
      <Icon color="#9E9E9E" name="chevron-right" size={16} />
    </NeuButton>
  );
}

/**
 * Option item component styles.
 */
const styles = StyleSheet.create({
  // Container
  container: {alignSelf: 'center', marginVertical: 5},

  // Content container
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },

  // Option info container
  info: {alignItems: 'center', flexDirection: 'row'},

  // Option icon container
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    width: 32,
  },

  // Text
  text: {
    color: Colors.primary_text,
    fontFamily: 'Heebo-Regular',
    fontSize: 14,
    letterSpacing: 0.25,
  },
});
