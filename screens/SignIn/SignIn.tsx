import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './SignIn.style';

export const SignIn: React.FC = () => {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate('Sign Up');
  };
  return (
    <View style={styles.container}>
      <View>
        <Text style={[styles.text, styles.mainInfo]}>Sign In</Text>
      </View>
      <TouchableOpacity onPress={handlePress}>
        <View>
          <Text style={styles.text}>or Sign Up</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
