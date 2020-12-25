import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import DisplayCouponSVG from './SVG/DisplayCouponSVG';
import Coupon from '../BusinessLayer/DataTypes/Coupon';
import AppText from './AppText';

export default function DisplayCoupon({ coupon, style }) {
	return (
		<View style={[styles.container, style]}>
			<AppText style={styles.text} numberOfLines={4}>
				{coupon.text}
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
		zIndex: 1,
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
	style: PropTypes.object,
};
