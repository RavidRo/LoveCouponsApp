import React, { Component } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { Bar } from 'react-native-progress';

import AppText from './AppText';

const maxPoints = 100;
const barWidth = '70%';
const barHeight = 40;
const filledColor = 'pink';
const unfilledColor = 'white';
const borderColor = 'red';

export default class Counter extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pointsAnim: new Animated.Value(0), //The animation
			points: 0, //The actual points in a given time
			pointsDisplaying: 0, //The points displaying to the user
			animationDuration: props.animationDuration || 0.25, //Seconds per point gained
		};
	}

	addPoints(addedPoints) {
		const newPoints = Math.min(this.state.points + addedPoints, maxPoints);
		this.setState({
			points: newPoints,
		});
		this.state.pointsAnim.addListener((progress) => {
			this.setState({ pointsDisplaying: progress.value });
		});
		Animated.timing(this.state.pointsAnim, {
			toValue: newPoints,
			duration: addedPoints * 1000 * this.state.animationDuration,
			useNativeDriver: true,
		}).start();
	}

	render() {
		return (
			<View style={[styles.outerContainer, this.props.style]}>
				<View style={styles.container}>
					<View style={styles.textContainer}>
						<AppText style={styles.counterText}>{`${Math.floor(
							this.state.pointsDisplaying
						)}/${maxPoints}`}</AppText>
					</View>
					<Bar
						animated
						progress={this.state.pointsDisplaying / maxPoints}
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
});
Counter.propTypes = {
	animationDuration: PropTypes.number,
	style: PropTypes.object,
};
