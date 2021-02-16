import React from 'react';
import { StyleSheet, TouchableNativeFeedback, View } from 'react-native';
import PropTypes from 'prop-types';
import Timer from './Timer';

export default function TimerButton({ onPress, timeLeft }) {
	return (
		<TouchableNativeFeedback onPress={() => onPress()}>
			<View style={styles.container}>
				<Timer timeLeft={timeLeft} />
			</View>
		</TouchableNativeFeedback>
	);
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		alignItems: 'center',
	},
});

TimerButton.propTypes = {
	onPress: PropTypes.func.isRequired,
	timeLeft: PropTypes.number.isRequired,
};
