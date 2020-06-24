import React from 'react';
import { SafeAreaView, TouchableWithoutFeedback, Text } from 'react-native';
import { useAuth } from 'hooks';
import { styles } from './Settings.style';

export const Settings: React.FC = () => {
  const { signOut } = useAuth();
  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={signOut}>
        <Text style={[styles.text, styles.button]}>Sign out</Text>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};
