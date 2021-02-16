import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import MainScreen from './app/Screens/MainScreen';
import CouponsScreen from './app/Screens/CouponsScreen';
import Screen from './app/components/Screen';
import Loading from './app/components/Loading';
import useInit from './app/Hooks/useInit';
import OfflineNotice from './app/components/OfflineNotice';

const drawerWidth = '80%';

const Drawer = createDrawerNavigator();

export default function App() {
	const loaded = useInit();
	return loaded ? (
		<>
			<NavigationContainer>
				<Drawer.Navigator
					initialRouteName="Main"
					drawerContent={(props) => <CouponsScreen {...props} />}
					drawerStyle={{ width: drawerWidth }}
				>
					<Drawer.Screen name="Main" component={MainScreen} />
				</Drawer.Navigator>
			</NavigationContainer>
			<OfflineNotice />
		</>
	) : (
		<Screen style={{ alignItems: 'center', justifyContent: 'center' }}>
			<Loading />
		</Screen>
	);
}
