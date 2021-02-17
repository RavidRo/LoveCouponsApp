import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import MainScreen from './app/Screens/MainScreen';
import CouponsScreen from './app/Screens/CouponsScreen';
import Screen from './app/components/Screen';
import Loading from './app/components/Loading';
import useInit from './app/Hooks/useInit';
import OfflineNotice from './app/components/OfflineNotice';
import AppButton from './app/components/AppButton';
import colors from './app/config/colors';
import { Button } from 'react-native';

const drawerWidth = '80%';

const Drawer = createDrawerNavigator();

export default function App() {
	const [loaded, loading, reload] = useInit();
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
			{loading ? (
				<Loading />
			) : (
				<AppButton
					onPress={reload}
					title={'Reconnect'}
					style={{
						backgroundColor: colors.blue,
						height: 45,
						justifyContent: 'center',
					}}
					textStyle={{ fontSize: 28 }}
				/>
			)}
		</Screen>
	);
}
