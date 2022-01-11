import React from 'react';
import HomeScreen from './src/screens/HomeScreen';
import TaskScreen from './src/screens/TaskScreen';
import LoginSignUpScreen from './src/screens/LoginSignUpScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GoogleSignIn from './src/screens/GoogleSignIn';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
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
          options={{ headerShown: false, title: 'Task' }}
          name='SignUpGoogle'
          component={GoogleSignIn}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
