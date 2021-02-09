import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { Bar } from 'react-native-progress';

import AppText from './AppText';
import Time from '../BusinessLayer/DataTypes/Time';
import Heart from './Heart';
import settings from '../config/settings';
import colors from '../config/colors';

const barWidth = '70%';
const barHeight = 40;
const filledColor = colors.pink;
const unfilledColor = colors.white;
const borderColor = colors.red;

const timeObject = new Time();

function getText(timeLeft) {
	const hours = timeObject.getHours(timeLeft);
	const minutes = timeObject.getMinutes(timeLeft);
	const seconds = timeObject.getSeconds(timeLeft);
	return `${hours ? `${hours}H` : ''} ${minutes ? `${minutes}M` : ''} ${
		seconds ? `${seconds}S` : 'Ready!'
	}`;
}

export default class Timer extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style={[styles.outerContainer, this.props.style]}>
				<View style={styles.container}>
					<Heart style={styles.heart} />
					<View style={styles.textContainer}>
						<AppText style={styles.counterText}>
							{getText(this.props.timeLeft)}
						</AppText>
					</View>
					<Bar
						animated
						progress={
							1 - this.props.timeLeft / settings.getPointsEvery
						}
						color={filledColor}
						unfilledColor={unfilledColor}
						borderColor={borderColor}
						width={null} //Sets the width to fill the parent
						height={barHeight}
						borderRadius={barHeight / 2}
						// style={{ width: '75%' }}
					/>
				</View>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	outerContainer: { width: barWidth },
	container: {
		justifyContent: 'center',
	},
	textContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
		alignSelf: 'center',
		zIndex: 1,
	},
	counterText: {},
	heart: {
		position: 'absolute',
		zIndex: 1,
		right: -20,
		top: -11,
	},
});

Timer.propTypes = {
	style: PropTypes.object,
	timeLeft: PropTypes.number,
};
