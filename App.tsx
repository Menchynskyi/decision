import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  content: {
    fontSize: 60,
  },
});

const App = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.content}>Dicision App</Text>
    </View>
  );
};

export default App;
