import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'hooks';
import { Input } from 'components';
import { styles } from './SignUp.style';

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
    onSubmit: val => {
      console.log(val);
    },
  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.form}>
          <Input
            placeholder="Email"
            value={values.email}
            onChangeText={changeHandlers.email}
            keyboardType="email-address"
          />
          <Input
            placeholder="Username"
            value={values.username}
            onChangeText={changeHandlers.username}
          />
          <Input
            placeholder="Password"
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
    </TouchableWithoutFeedback>
  );
};
