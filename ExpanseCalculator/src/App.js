import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './Login';
import Registration from './Registration';
import PasswordReset from './PasswordReset';
import ExpenseManagement from './ExpenseManagement';
import ExpenseListing from './ExpenseListing';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Registration" component={Registration} />
        <Stack.Screen name="PasswordReset" component={PasswordReset} />
        <Stack.Screen name="ExpenseManagement" component={ExpenseManagement} />
        <Stack.Screen name="ExpenseListing" component={ExpenseListing} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
