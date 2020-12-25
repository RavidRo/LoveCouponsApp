import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import MainScreen from './app/Screens/MainScreen';
import CouponsScreen from './app/Screens/CouponsScreen';

const drawerWidth = '80%';

const Drawer = createDrawerNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Drawer.Navigator
				initialRouteName="Main"
				drawerContent={(props) => <CouponsScreen {...props} />}
				drawerStyle={{ width: drawerWidth }}
			>
				<Drawer.Screen name="Main" component={MainScreen} />
			</Drawer.Navigator>
		</NavigationContainer>
	);
}
