import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './SignUp.style';

export const SignUp: React.FC = () => {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate('Sign In');
  };
  return (
    <View style={styles.container}>
      <View>
        <Text style={[styles.text, styles.mainInfo]}>Sign Up</Text>
      </View>
      <TouchableOpacity onPress={handlePress}>
        <View>
          <Text style={styles.text}>or Sign In</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
