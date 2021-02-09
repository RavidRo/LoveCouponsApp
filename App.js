import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { useState } from 'react';
import { ActivityIndicator } from 'react-native';

import MainScreen from './app/Screens/MainScreen';
import CouponsScreen from './app/Screens/CouponsScreen';
import couponsConfig from './app/config/couponsConfig';
import StateHandler from './app/BusinessLayer/Data/StateHandler';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { ClipPath } from 'react-native-svg';
import colors from './app/config/colors';
import Screen from './app/components/Screen';
import Loading from './app/components/Loading';
import useInit from './app/Hooks/useInit';

const drawerWidth = '80%';

const Drawer = createDrawerNavigator();

export default function App() {
	const loaded = useInit();
	return loaded ? (
		<NavigationContainer>
			<Drawer.Navigator
				initialRouteName="Main"
				drawerContent={(props) => <CouponsScreen {...props} />}
				drawerStyle={{ width: drawerWidth }}
			>
				<Drawer.Screen name="Main" component={MainScreen} />
			</Drawer.Navigator>
		</NavigationContainer>
	) : (
		<Screen style={{ alignItems: 'center' }}>
			<Loading />
		</Screen>
	);
}
