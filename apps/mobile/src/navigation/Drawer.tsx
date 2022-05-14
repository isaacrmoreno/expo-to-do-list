import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import LogOutButton from '../components/LogOutButton'
import TaskScreen from '../screens/TaskScreen'

const Drawer = createDrawerNavigator()

const MyDrawer: React.FC = () => {
  return (
    <Drawer.Navigator useLegacyImplementation drawerContent={() => <LogOutButton />}>
      <Drawer.Screen
        name='Task'
        component={TaskScreen}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  )
}

export default MyDrawer
