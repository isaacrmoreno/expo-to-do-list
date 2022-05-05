import React from 'react';
import HomeScreen from './src/screens/HomeScreen';
// import TaskScreen from './src/screens/TaskScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';
import Toast from 'react-native-toast-message';
import TaskButtons from './src/screens/TaskScreen';
import LogOutButton from './src/components/LogOutButton';

const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

const MyDrawer: React.FC = () => {
  return (
    <Drawer.Navigator useLegacyImplementation
		drawerContent={() => <LogOutButton /> }
		>
		<Drawer.Screen name="Task" component={TaskButtons} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName='Drawer'>
				<Stack.Screen 
					options={{ headerShown: false, title: 'Drawer' }}
					name='Drawer'
					component={MyDrawer}
				/>
				<Stack.Screen
					options={{ headerShown: false, title: 'Home' }}
					name='Home'
					component={HomeScreen}
				/>
				{/* <Stack.Screen
					options={{ headerShown: false, title: 'Task' }}
					name='Task'
					component={TaskScreen}
				/> */}
			</Stack.Navigator>
			<Toast />
		</NavigationContainer>
  );
}
