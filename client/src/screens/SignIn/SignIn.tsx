import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Input } from 'components';
import { useForm, useAuthDispatch } from 'hooks';
import { validatePassword, validateUsername } from 'utils';
import { signIn } from 'api';
import { styles } from './SignIn.style';

export const SignIn: React.FC = () => {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate('SignUp');
  };
  const dispatch = useAuthDispatch();

  const { changeHandlers, handleSubmit, values, dirty, errors } = useForm({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: val => {
      signIn(dispatch, val);
    },
    validationSchema: {
      username: validateUsername,
      password: validatePassword,
    },
  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.form}>
          <Input
            placeholder="Username or Email"
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
        <TouchableOpacity onPress={handlePress}>
          <View>
            <Text style={styles.text}>or Sign Up</Text>
          </View>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};
