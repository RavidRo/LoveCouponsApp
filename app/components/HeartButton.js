import React from 'react';
import { View, StyleSheet, TouchableNativeFeedback } from 'react-native';
import colors from '../config/colors';
import Heart from './Heart';
import PropTypes from 'prop-types';
import AppText from './AppText';

const borderWidth = 0.5;
const backgroundColor = colors.light;
const borderColor = colors.black;

export default function HeartButton({
	onPress,
	text,
	circled = false,
	size = 100,
	...otherProps
}) {
	const circledStyles =
		circled &&
		StyleSheet.create({
			btnContainer: {
				borderColor: borderColor,
				borderWidth: borderWidth,
			},
			heartContainer: {
				backgroundColor: backgroundColor,
			},
		});

	const styles = StyleSheet.create({
		// I separated the button to 2 containers so the touchable animation will fill all the button and will not overflow
		btnContainer: {
			overflow: 'hidden',
			borderRadius: size / 2,
		},
		heartContainer: {
			width: size,
			height: size,
			justifyContent: 'center',
			alignItems: 'center',
		},
		text: {
			position: 'absolute',
			zIndex: 1,
			color: colors.white,
		},
	});

	return (
		<View style={[styles.btnContainer, circledStyles.btnContainer]}>
			<TouchableNativeFeedback onPress={onPress}>
				<View
					style={[
						styles.heartContainer,
						circledStyles.heartContainer,
					]}
				>
					<AppText style={styles.text}>{text}</AppText>
					<Heart size={size / 2} {...otherProps} />
				</View>
			</TouchableNativeFeedback>
		</View>
	);
}

HeartButton.propTypes = {
	onPress: PropTypes.func,
	text: PropTypes.string,
	circled: PropTypes.bool,
	size: PropTypes.number,
};
