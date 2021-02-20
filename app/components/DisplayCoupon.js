import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import DisplayCouponSVG from './SVG/DisplayCouponSVG';
import Coupon from '../BusinessLayer/DataTypes/Coupon';
import AppText from './AppText';

export default function DisplayCoupon({ coupon, style, textStyle }) {
	return (
		<View style={[styles.container, style]}>
			<AppText
				weight={'medium'}
				style={{ ...styles.text, ...textStyle }}
				numberOfLines={6}
			>
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
		fontSize: 28,
		// top: '25%',
		zIndex: 1,
	},
	container: {
		justifyContent: 'center',
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
