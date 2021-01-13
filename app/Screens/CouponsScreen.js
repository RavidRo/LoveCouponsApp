import React, { useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import AppText from '../components/AppText';
import Screen from '../components/Screen';
import DisplayCoupon from '../components/DisplayCoupon';
import couponsHandler from '../BusinessLayer/Data/CouponsHandler';

export default function CouponsScreen() {
	const [displayingCoupons, setDisplayingCoupons] = useState([]);
	// TODO: 1) Handle errors correctly 2) Add some kind of loading indicator 3) Don't put the initial loading here
	couponsHandler.listenToChange(setDisplayingCoupons);
	couponsHandler.load();

	return (
		<Screen style={styles.container}>
			<AppText>Your Coupons:</AppText>
			<FlatList
				data={displayingCoupons}
				renderItem={({ item }) => <DisplayCoupon coupon={item} />}
				keyExtractor={(_, index) => index.toString()}
			/>
		</Screen>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'cyan',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
