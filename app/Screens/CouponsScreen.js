import React from 'react';
import { StyleSheet } from 'react-native';

import AppText from '../components/AppText';
import Screen from '../components/Screen';
import DisplayCoupon from '../components/DisplayCoupon';
import { Coupon, Rarity } from '../BusinessLayer/DataTypes/CouponObject';

export default function CouponsScreen() {
	return (
		<Screen style={styles.container}>
			<AppText>Hello World</AppText>
			<DisplayCoupon coupon={new Coupon(Rarity.epic, 'I Love You')} />
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
