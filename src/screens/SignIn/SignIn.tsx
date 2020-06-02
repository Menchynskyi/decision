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
import { useForm } from 'hooks';
import { styles } from './SignIn.style';

export const SignIn: React.FC = () => {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate('SignUp');
  };

  const { changeHandlers, handleSubmit, values, dirty, errors } = useForm({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: val => {
      console.log(val);
    },
    validationSchema: {
      username: val => {
        let error = '';
        if (val.length === 0) {
          error = 'requiered';
        }
        return error;
      },
      password: val => {
        let error = '';
        if (val.length === 0) {
          error = 'requiered';
        }
        return error;
      },
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
