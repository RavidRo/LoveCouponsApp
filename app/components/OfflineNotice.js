import React from 'react';
import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { useNetInfo } from '@react-native-community/netinfo';

import colors from '../config/colors';
import AppText from './AppText';

export default function OfflineNotice() {
	const connection = useNetInfo();
	if (
		connection.type === 'unknown' ||
		connection.isInternetReachable !== false
	) {
		return <></>;
	}
	return (
		<View style={styles.container}>
			<AppText style={styles.text} weight={'medium'}>
				No Internet Connection
			</AppText>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.blue,
		height: 50 + Constants.statusBarHeight,
		width: '100%',
		position: 'absolute',
		zIndex: 1,
		paddingTop: Constants.statusBarHeight,
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 0.5,
		borderBottomColor: colors.medium,
	},
	text: {
		color: colors.medium,
	},
});

OfflineNotice.propTypes = {};
