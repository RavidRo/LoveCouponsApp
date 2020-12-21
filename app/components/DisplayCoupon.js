import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import DisplayCouponSVG from './SVG/DisplayCouponSVG';
import { Coupon } from '../BusinessLayer/DataTypes/CouponObject';
import AppText from './AppText';

export default function DisplayCoupon({ coupon }) {
	return (
		<View style={styles.container}>
			<AppText style={styles.text} numberOfLines={4}>
				רביד בוחר מה עושים ליום שלם
			</AppText>
			<DisplayCouponSVG
				style={styles.coupon}
				rarityColor={coupon.rarityColor}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	text: {
		position: 'absolute',
		fontSize: 35,
		top: '10%',
		right: '22%',
		width: '78%',
		// backgroundColor: 'red',
	},
	container: {
		transform: [
			{
				scale: 0.65,
			},
		],
	},
});

DisplayCoupon.propTypes = {
	coupon: PropTypes.instanceOf(Coupon).isRequired,
};
