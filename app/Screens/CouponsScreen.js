import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import AppText from '../components/AppText';
import Screen from '../components/Screen';
import DisplayCoupon from '../components/DisplayCoupon';
import couponsHandler from '../BusinessLayer/Data/CouponsHandler';
import colors from '../config/colors';

export default function CouponsScreen() {
	const [displayingCoupons, setDisplayingCoupons] = useState([]);
	// TODO: 1) Handle errors correctly 2) Add some kind of loading indicator 3) Don't put the initial loading here
	useEffect(() => {
		couponsHandler.listenToChange(setDisplayingCoupons);
		couponsHandler.load();
	}, []);

	return (
		<Screen style={styles.container}>
			<AppText>Your Coupons:</AppText>
			<FlatList
				data={displayingCoupons}
				renderItem={({ item }) => (
					<DisplayCoupon
						coupon={item}
						style={styles.coupon}
						textStyle={styles.couponText}
					/>
				)}
				keyExtractor={(_, index) => index.toString()}
			/>
		</Screen>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.cyan,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	coupon: {
		marginLeft: '-17.5%',
		marginVertical: '-10%',
	},
	couponText: {
		left: '30%',
		width: '52%',
	},
});
