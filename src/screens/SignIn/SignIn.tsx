import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './SignIn.style';

export const SignIn: React.FC = () => {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate('SignUp');
  };

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleChangeUserName = (text: string) => {
    setUserName(text);
  };

  const handleChangePassword = (text: string) => {
    setPassword(text);
  };

  const handleSubmit = () => {
    if (userName.trim() && password.trim()) {
      console.log(userName);
      console.log(password);
    }
  };

  const isDisabled = !userName || !password;

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput
          placeholder="Username or Email"
          style={styles.input}
          value={userName}
          onChangeText={handleChangeUserName}
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          value={password}
          onChangeText={handleChangePassword}
          secureTextEntry
        />
        <TouchableOpacity disabled={isDisabled} onPress={handleSubmit}>
          <View style={[styles.submitButton, isDisabled && styles.disabled]}>
            <Text style={styles.submitText}>Sign In</Text>
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handlePress}>
        <View>
          <Text style={styles.text}>or Sign Up</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
