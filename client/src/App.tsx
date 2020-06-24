import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SignIn, SignUp, Home, Settings } from 'screens';
import { useInitialAuth } from 'hooks';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export const App: React.FC = () => {
  const isLoggedIn = useInitialAuth();

  return (
    <NavigationContainer>
      <>
        {!isLoggedIn ? (
          <Stack.Navigator headerMode="none">
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
          </Stack.Navigator>
        ) : (
          <Tab.Navigator>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Settings" component={Settings} />
          </Tab.Navigator>
        )}
      </>
    </NavigationContainer>
  );
};

export default App;
