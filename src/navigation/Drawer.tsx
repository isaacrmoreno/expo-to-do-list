
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

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
