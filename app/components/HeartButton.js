import React from 'react';
import { View, StyleSheet, TouchableNativeFeedback } from 'react-native';
import colors from '../config/colors';
import Heart from './Heart';
import PropTypes from 'prop-types';

const size = 100;
const borderWidth = 0.5;
const backgroundColor = colors.light;
const borderColor = colors.black;

export default function HeartButton({ onPress }) {
	return (
		<View style={styles.btnContainer}>
			<TouchableNativeFeedback onPress={onPress}>
				<View style={styles.heartContainer}>
					<Heart />
				</View>
			</TouchableNativeFeedback>
		</View>
	);
}

const styles = StyleSheet.create({
	// I separated the button to 2 containers so the touchable animation will fill all the button and will not overflow
	btnContainer: {
		overflow: 'hidden',
		borderRadius: size / 2,
		borderWidth: borderWidth,
		borderColor: borderColor,
	},
	heartContainer: {
		width: size,
		height: size,
		backgroundColor: backgroundColor,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

HeartButton.propTypes = {
	onPress: PropTypes.func,
};
