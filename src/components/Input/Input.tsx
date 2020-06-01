import React from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { styles } from './Input.style';

type InputProps = {
  errorMessage?: string;
} & TextInputProps;

export const Input: React.FC<InputProps> = ({ ...rest }) => {
  return <TextInput style={styles.input} {...rest} />;
};

Input.defaultProps = {
  errorMessage: '',
};
