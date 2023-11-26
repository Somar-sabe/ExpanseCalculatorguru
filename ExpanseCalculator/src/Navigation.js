import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/screens/login'; 

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            title: 'Login Screen',
            headerShown: false, 
          }}
        />
   
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
