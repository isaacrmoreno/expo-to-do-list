import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import SignOutButton from '../components/SignOutButton'
import TaskScreen from '../screens/TaskScreen'

const Drawer = createDrawerNavigator()

const MenuDrawer: React.FC = () => {
  return (
    <Drawer.Navigator useLegacyImplementation drawerContent={() => <SignOutButton />}>
      <Drawer.Screen
        name='Task'
        component={TaskScreen}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  )
}

export default MenuDrawer
