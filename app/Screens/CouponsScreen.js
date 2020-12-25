import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

import AppText from '../components/AppText';
import Screen from '../components/Screen';
import DisplayCoupon from '../components/DisplayCoupon';
import Coupon from '../BusinessLayer/DataTypes/Coupon';
import couponsConfig from '../config/couponsConfig';
import couponsHandler from '../BusinessLayer/Data/couponsHandler';

const couponsInit = [
	new Coupon(couponsConfig.rarities.uncommon, 'I Love You'),
	new Coupon(couponsConfig.rarities.legendary, 'I <3 U'),
];

export default function CouponsScreen() {
	const [displayingCoupons, setDisplayingCoupons] = useState(couponsInit);
	couponsHandler.listenToChange(setDisplayingCoupons);

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
