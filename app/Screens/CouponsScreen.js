import React from 'react';
import { StyleSheet } from 'react-native';

import AppText from '../components/AppText';
import Screen from '../components/Screen';
import DisplayCoupon from '../components/DisplayCoupon';
import { Coupon, Rarity } from '../BusinessLayer/DataTypes/CouponObject';

const coupons = [
	{ id: 1, coupon: new Coupon(Rarity.uncommon, 'I Love You') },
	{ id: 2, coupon: new Coupon(Rarity.legendary, 'I Love You') },
];

export default function CouponsScreen() {
	return (
		<Screen style={styles.container}>
			<AppText>Hello World</AppText>
			{coupons.map((item) => (
				<DisplayCoupon
					key={item.id}
					coupon={item.coupon}
					style={{ backgroundColor: 'red' }}
				/>
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
