import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './SignIn.style';
import { useForm } from '../../hooks';

export const SignIn: React.FC = () => {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate('SignUp');
  };

  const { changeHandlers, handleSubmit, values, dirty } = useForm({
    initialValues: {
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
          <TextInput
            placeholder="Username or Email"
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
    </TouchableWithoutFeedback>
  );
};
