import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

import AppText from '../components/AppText';
import Screen from '../components/Screen';
import DisplayCoupon from '../components/DisplayCoupon';
import couponsHandler from '../BusinessLayer/Data/couponsHandler';

export default function CouponsScreen() {
	const [displayingCoupons, setDisplayingCoupons] = useState([]);
	// TODO: 1) Handle errors correctly 2) Add some kind of loading indicator 3) Don't put the initial loading here
	couponsHandler.getCoupons().then(setDisplayingCoupons);
	// couponsHandler.getCoupons().then(console.log);

	couponsHandler.listenToChange((coupons) => {
		console.log('New Coupon Registered');
		setDisplayingCoupons(coupons);
	});

	return (
		<Screen style={styles.container}>
			<AppText>Hello World</AppText>
			{displayingCoupons.map((item, index) => (
				<DisplayCoupon key={index} coupon={item} />
			))}
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
