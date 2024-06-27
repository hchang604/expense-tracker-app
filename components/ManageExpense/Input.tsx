import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import {GlobalStyles} from '../../constants/styles';

type InputProps = {
  label: string;
  textInputConfig: TextInputProps;
  inputContainerStyles?: ViewStyle;
  isInvalid: boolean;
};

function Input(props: InputProps) {
  const multiline = props.textInputConfig?.multiline;

  return (
    <View style={[styles.inputContainer, props.inputContainerStyles]}>
      <Text style={[styles.label, props.isInvalid && styles.invalidLabel]}>
        {props.label}
      </Text>
      <TextInput
        style={[
          styles.input,
          multiline && styles.inputMultiline,
          props.isInvalid && styles.invalidInput,
        ]}
        {...props.textInputConfig}
      />
    </View>
  );
}
export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
    color: GlobalStyles.colors.primary700,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  invalidLabel: {
    color: GlobalStyles.colors.error500,
  },
  invalidInput: {
    backgroundColor: GlobalStyles.colors.error50,
  },
});
