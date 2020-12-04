import React from 'react';
import { View, StyleSheet } from 'react-native';
import colors from '../config/colors';

const width = 40; // HeartSize
// Calculations
const shapeRadius = width / 2;
const heartWidth = width / Math.sqrt(2) + width;
const shapeHeight = (3 * width) / 2;
const shapeCenterDistanceToHeartCenter = heartWidth / 2 - width / 2;
const shapeBottomEndingDistanceToCenter = width / (4 * Math.sqrt(2));

const color = colors.red;

export default function Heart() {
	return (
		<View style={styles.heart}>
			<View style={[styles.heartShape, styles.leftHeart]} />
			<View style={[styles.heartShape, styles.rightHeart]} />
		</View>
	);
}

const styles = StyleSheet.create({
	heart: {
		width: heartWidth,
	},
	heartShape: {
		height: shapeHeight,
		width: width,
		borderTopRightRadius: shapeRadius,
		borderTopLeftRadius: shapeRadius,
		backgroundColor: color,
	},
	leftHeart: {
		position: 'absolute',
		transform: [{ rotate: '-45deg' }],
		right:
			shapeCenterDistanceToHeartCenter -
			shapeBottomEndingDistanceToCenter,
	},
	rightHeart: {
		transform: [{ rotate: '45deg' }],
		left:
			shapeCenterDistanceToHeartCenter -
			shapeBottomEndingDistanceToCenter,
	},
});
