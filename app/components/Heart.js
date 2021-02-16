import React from 'react';
import { View } from 'react-native';
import colors from '../config/colors';
import PropTypes from 'prop-types';

export default function Heart({
	style,
	size = 40,
	color = colors.red,
	borderWidth = 0.5,
	borderColor = colors.medium_04,
}) {
	const width = size;
	// Calculations
	const shapeRadius = width / 2;
	const heartWidth = width / Math.sqrt(2) + width;
	const shapeHeight = (3 * width) / 2;
	const shapeCenterDistanceToHeartCenter = heartWidth / 2 - width / 2;
	const shapeBottomEndingDistanceToCenter = width / (4 * Math.sqrt(2));

	const styles = {
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
		fakeHeart: {
			position: 'absolute',
			zIndex: -1,
		},
		fakeChick: {
			borderWidth,
			borderColor,
		},
		realChick: {
			borderWidth,
			borderColor: colors.transparent,
		},
	};

	return (
		<View style={style}>
			<View style={[styles.heart, styles.fakeHeart]}>
				<View
					style={[
						styles.heartShape,
						styles.leftHeart,
						styles.fakeChick,
					]}
				/>
				<View
					style={[
						styles.heartShape,
						styles.rightHeart,
						styles.fakeChick,
					]}
				/>
			</View>
			<View style={[styles.heart]}>
				<View
					style={[
						styles.heartShape,
						styles.leftHeart,
						styles.realChick,
					]}
				/>
				<View
					style={[
						styles.heartShape,
						styles.rightHeart,
						styles.realChick,
					]}
				/>
			</View>
		</View>
	);
}

Heart.propTypes = {
	style: PropTypes.object,
	size: PropTypes.number,
	color: PropTypes.string,
	borderWidth: PropTypes.number,
	borderColor: PropTypes.string,
};
