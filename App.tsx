import React from 'react';
import HomeScreen from './src/screens/HomeScreen';
import TaskScreen from './src/screens/TaskScreen';
import LoginSignUpScreen from './src/screens/LoginSignUpScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';
import GoogleSignIn from './src/screens/GoogleSignIn';
import TaskButtons from './src/screens/TaskScreen';
import LogOutButton from './src/components/LogOutButton';

const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

const MyDrawer: React.FC = () => {
  return (
    <Drawer.Navigator useLegacyImplementation>
      <Drawer.Screen name="Task" component={TaskButtons} />
			<Drawer.Screen name="Log Out" component={LogOutButton} />

			{/* <DrawerItem label="Help" onPress={() => alert('Link to help')} /> */}
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
				/> // we dont need this task if we get the drawer to work */}
				<Stack.Screen
					options={{ headerShown: false, title: 'Task' }}
					name='SignUpGoogle'
					component={GoogleSignIn}
				/>
			</Stack.Navigator>
		</NavigationContainer>
  );
}
