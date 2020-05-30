import React from 'react';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './SignUp.style';
import { useForm } from '../../hooks';

export const SignUp: React.FC = () => {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate('SignIn');
  };

  const { changeHandlers, handleSubmit, dirty, values } = useForm({
    initialValues: {
      email: '',
      username: '',
      password: '',
    },
    onSubmit: (val) => {
      console.log(val);
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput
          placeholder="Email"
          style={styles.input}
          value={values.email}
          onChangeText={changeHandlers.email}
        />
        <TextInput
          placeholder="Username"
          style={styles.input}
          value={values.username}
          onChangeText={changeHandlers.username}
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          value={values.password}
          onChangeText={changeHandlers.password}
          secureTextEntry
        />
        <TouchableOpacity disabled={dirty} onPress={handleSubmit}>
          <View style={[styles.submitButton, dirty && styles.disabled]}>
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
