import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { Bar } from 'react-native-progress';

import AppText from './AppText';
import Time from '../BusinessLayer/DataTypes/Time';
import Heart from './Heart';

const barWidth = '70%';
const barHeight = 40;
const filledColor = 'pink';
const unfilledColor = 'white';
const borderColor = 'red';

const timeLeft = 1200; //In seconds
const originalTime = 3660;

export default class Timer extends Component {
	constructor(props) {
		super(props);

		const timeObject = new Time(timeLeft);

		this.state = {
			timeLeft,
			hours: timeObject.hours,
			minutes: timeObject.minutes,
			seconds: timeObject.seconds,
		};
		setInterval(() => {
			this.setState({
				hours: timeObject.getHours(this.state.timeLeft - 1),
				minutes: timeObject.getMinutes(this.state.timeLeft - 1),
				seconds: timeObject.getSeconds(this.state.timeLeft - 1),
				timeLeft: this.state.timeLeft - 1,
			});
		}, 1000);
	}

	render() {
		return (
			<View style={[styles.outerContainer, this.props.style]}>
				<View style={styles.container}>
					<Heart style={styles.heart} />
					<View style={styles.textContainer}>
						<AppText
							style={styles.counterText}
						>{`${this.state.hours}H ${this.state.minutes}M ${this.state.seconds}S`}</AppText>
					</View>
					<Bar
						animated
						progress={1 - this.state.timeLeft / originalTime}
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
	animationDuration: PropTypes.number,
	style: PropTypes.object,
};
