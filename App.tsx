import React from 'react';
import TaskScreen from './src/screens/TaskScreen';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false, title: 'Home' }}
          name='Home'
          component={HomeScreen}
        />
        <Stack.Screen
          options={{ headerShown: false, title: 'Task' }}
          name='Task'
          component={TaskScreen}
        />
        <Stack.Screen
          options={{ headerShown: false, title: 'Login' }}
          name='Login'
          component={LoginScreen}
        />
        <Stack.Screen
          options={{ headerShown: false, title: 'Sign Up' }}
          name='SignUpEmail'
          component={SignUpScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
