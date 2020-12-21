import React, { Component } from 'react';
import { Animated } from 'react-native';
import PropTypes from 'prop-types';

import CouponSVG from './SVG/CouponSVG';

const maxPoints = 100;
export default class CouponCounter extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pointsAnim: new Animated.Value(0), //The animation
			points: 0, //The actual points in a given time
			pointsDisplaying: 0, //The points displaying to the user
			animationDuration: props.animationDuration || 0.1, //Seconds per point gained
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
			useNativeDriver: false,
		}).start();
	}

	render() {
		return (
			<CouponSVG
				currentPoints={Math.floor(this.state.pointsDisplaying)}
				maxPoints={maxPoints}
			/>
		);
	}
}

CouponCounter.propTypes = {
	animationDuration: PropTypes.number,
	style: PropTypes.object,
};
