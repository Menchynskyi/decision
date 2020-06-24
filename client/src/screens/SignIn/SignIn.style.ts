import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  text: {
    fontSize: 16,
    color: '#616161',
  },
  mainInfo: {
    fontSize: 50,
    color: '#333333',
  },
  form: {
    width: 300,
  },
  submitButton: {
    paddingVertical: 10,
    marginBottom: 10,
    backgroundColor: '#83D4FF',
    alignItems: 'center',
    borderRadius: 5,
  },
  disabled: {
    backgroundColor: '#BABABA',
  },
  submitText: {
    fontSize: 18,
    textTransform: 'uppercase',
    color: '#ffffff',
  },
});
