import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SignIn, SignUp } from 'screens';
import { useAuthState } from 'hooks';
import { View, Text } from 'react-native';

const Stack = createStackNavigator();

export const App: React.FC = () => {
  const { isLoggedIn } = useAuthState();

  if (!isLoggedIn)
    return (
      <NavigationContainer>
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
      </NavigationContainer>
    );

  return (
    <View>
      <Text>Authed App</Text>
    </View>
  );
};

export default App;
