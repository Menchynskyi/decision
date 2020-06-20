import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SignIn, SignUp } from 'screens';
import { useAuthState } from 'hooks';
import { SafeAreaView, Text } from 'react-native';

const Stack = createStackNavigator();

export const App: React.FC = () => {
  const { isLoggedIn, user } = useAuthState();

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
    <SafeAreaView>
      <Text>{`Hello ${user?.username}`}</Text>
    </SafeAreaView>
  );
};

export default App;
