import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { useAuthState } from 'hooks';
import { styles } from './Home.style';

export const Home: React.FC = () => {
  const { user } = useAuthState();
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>{`Hello ${user?.username}!`}</Text>
    </SafeAreaView>
  );
};
