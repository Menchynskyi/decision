import React from 'react';
import { TextInput, TextInputProps, Text } from 'react-native';
import { styles } from './Input.style';

type InputProps = {
  errorMessage?: string;
} & TextInputProps;

export const Input: React.FC<InputProps> = ({ errorMessage, ...rest }) => {
  return (
    <>
      <TextInput
        style={[styles.input, !!errorMessage && styles.inputError]}
        {...rest}
      />
      <Text style={styles.errorMessage}>{errorMessage}</Text>
    </>
  );
};

Input.defaultProps = {
  errorMessage: '',
};
