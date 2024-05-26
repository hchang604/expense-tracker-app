import React from 'react';
import {GlobalStyles} from '../../constants/styles';
import {
  Pressable,
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';

type ButtonProps = {
  buttonText: string;
  buttonPressHandler: () => void;
  style?: StyleProp<ViewStyle>;
  state?: 'flat';
};

function Button(props: ButtonProps) {
  return (
    <View style={props.style}>
      <Pressable
        style={({pressed}) => pressed && styles.pressed}
        onPress={props.buttonPressHandler}>
        <View style={[styles.button, props.state === 'flat' && styles.flat]}>
          <Text
            style={[
              styles.buttonText,
              props.state === 'flat' && styles.flatText,
            ]}>
            {props.buttonText}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

export default Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary500,
  },
  flat: {
    backgroundColor: 'transparent',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  flatText: {
    color: GlobalStyles.colors.primary200,
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: GlobalStyles.colors.primary100,
    borderRadius: 4,
  },
});
