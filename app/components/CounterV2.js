import React, { Component } from 'react';
import { Animated, View } from 'react-native';
import PropTypes from 'prop-types';
import LottieView from 'lottie-react-native';

import AppText from './AppText';

const maxPoints = 100;
const progressBar = require('../assets/Animations/progressBar.json');

export default class CounterV2 extends Component {
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
		this.setState({ points: this.state.points + addedPoints });
		this.state.pointsAnim.addListener((progress) => {
			this.setState({ pointsDisplaying: progress.value });
		});
		Animated.timing(this.state.pointsAnim, {
			toValue: this.state.points + addedPoints,
			duration: addedPoints * 1000 * this.state.animationDuration,
			useNativeDriver: false,
		}).start();
	}

	render() {
		return (
			<View>
				<LottieView
					progress={Math.min(
						this.state.pointsDisplaying / maxPoints,
						1
					)}
					style={
						{
							// width: 400,
							// height: 400,
							// backgroundColor: '#eee',
						}
					}
					source={progressBar}
				/>
				<AppText>{`${Math.floor(
					this.state.pointsDisplaying
				)}/${maxPoints}`}</AppText>
			</View>
		);
	}
}

CounterV2.propTypes = {
	animationDuration: PropTypes.number,
};
