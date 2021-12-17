import React from 'react';
import TaskScreen from './src/screens/TaskScreen';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen1 from './src/screens/LoginScreen1';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import SignUpEmailScreen from './src/screens/SignUpEmailScreen';
import SignUpScreen from './src/screens/SignUpScreen';

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
          options={{ headerShown: true, title: 'Login' }}
          name='Login'
          component={LoginScreen}
        />
        <Stack.Screen
          options={{ headerShown: false, title: 'Sign Up' }}
          name='Email'
          component={LoginScreen1}
        />
        <Stack.Screen
          options={{ headerShown: false, title: 'Login' }}
          name='Login1'
          component={LoginScreen1}
        />
        <Stack.Screen
          options={{ headerShown: false, title: 'Sign Up' }}
          name='SignUp'
          component={SignUpScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
