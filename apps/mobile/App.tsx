import React from 'react'
import { StatusBar } from 'expo-status-bar'
import HomeScreen from './src/screens/HomeScreen'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Toast from 'react-native-toast-message'
import MenuDrawer from './src/navigation/Drawer'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style='auto' />
      <Stack.Navigator initialRouteName='Drawer'>
        <Stack.Screen
          options={{ headerShown: false, title: 'Drawer' }}
          name='Drawer'
          component={MenuDrawer}
        />
        <Stack.Screen
          options={{ headerShown: false, title: 'Home' }}
          name='Home'
          component={HomeScreen}
        />
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  )
}
