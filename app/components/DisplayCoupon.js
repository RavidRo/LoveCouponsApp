import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import DisplayCouponSVG from './SVG/DisplayCouponSVG';
import Coupon from '../BusinessLayer/DataTypes/Coupon';
import AppText from './AppText';

export default function DisplayCoupon({ coupon, style, textStyle }) {
	return (
		<View style={[styles.container, style]}>
			<AppText style={{ ...styles.text, ...textStyle }} numberOfLines={6}>
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
		fontSize: 25,
		top: '8.5%',
		zIndex: 1,
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
	textStyle: PropTypes.object,
};
