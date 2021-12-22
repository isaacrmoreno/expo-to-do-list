import React from 'react';
import TaskScreen from './src/screens/TaskScreen';
import HomeScreen from './src/screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
