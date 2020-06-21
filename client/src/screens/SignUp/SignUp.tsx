import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm, useAuthState, useAuth } from 'hooks';
import { Input } from 'components';
import { validateEmail, validateUsername, validatePassword } from 'utils';
import { styles } from './SignUp.style';

export const SignUp: React.FC = () => {
  const navigation = useNavigation();
  const { signUp } = useAuth();
  const {
    isLoading,
    signUpError: { isError, errorMessage },
  } = useAuthState();

  const handlePress = () => {
    navigation.navigate('SignIn');
  };

  const { changeHandlers, handleSubmit, dirty, values, errors } = useForm({
    initialValues: {
      email: '',
      username: '',
      password: '',
    },
    onSubmit: val => {
      signUp(val);
    },
    validationSchema: {
      email: validateEmail,
      username: validateUsername,
      password: validatePassword,
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
            errorMessage={errors.email}
          />
          <Input
            placeholder="Username"
            value={values.username}
            onChangeText={changeHandlers.username}
            errorMessage={errors.username}
          />
          <Input
            placeholder="Password"
            value={values.password}
            onChangeText={changeHandlers.password}
            secureTextEntry
            errorMessage={errors.password}
          />
          <TouchableOpacity disabled={dirty} onPress={handleSubmit}>
            <View style={[styles.submitButton, dirty && styles.disabled]}>
              <Text style={styles.submitText}>Sign In</Text>
            </View>
          </TouchableOpacity>
        </View>
        {isLoading && <Text>Wait a sec...</Text>}
        {isError && <Text>{errorMessage}</Text>}
        <TouchableOpacity onPress={handlePress}>
          <View>
            <Text style={styles.text}>or Sign Up</Text>
          </View>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};
