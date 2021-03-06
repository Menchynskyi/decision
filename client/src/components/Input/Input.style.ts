import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#52595C',
    borderRadius: 5,
    fontSize: 18,
    color: '#52595C',
  },
  inputError: {
    borderColor: '#FF6767',
  },
  errorMessage: {
    height: 16,
    paddingTop: 1,
    paddingBottom: 3,
    color: '#FF6767',
    fontSize: 10,
    textTransform: 'capitalize',
  },
});
