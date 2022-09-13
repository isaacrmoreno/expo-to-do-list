import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MenuDrawer from './src/navigation/MenuDrawer'
import 'expo-dev-client'

const Stack = createNativeStackNavigator()

export default function App() {
	return (
		<NavigationContainer>
			<StatusBar style='auto' />
			<Stack.Navigator initialRouteName='Drawer'>
				<Stack.Screen options={{ headerShown: false, title: 'Drawer' }} name='Drawer' component={MenuDrawer} />
			</Stack.Navigator>
		</NavigationContainer>
	)
}
