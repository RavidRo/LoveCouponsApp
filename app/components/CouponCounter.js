import React, { Component } from 'react';
import { Animated } from 'react-native';
import PropTypes from 'prop-types';

import CouponSVG from './SVG/CouponSVG';
import settings from '../config/settings';

const maxPoints = settings.pointsForCoupon;
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
	// !This is a private method and should not be used externally
	// !the actual points will not be synchronized with the animation
	animateTo(valueTo) {
		// I'm stopping the current animation before starting a new one
		this.state.pointsAnim.stopAnimation((currentValue) => {
			// const currentValue = this.state.pointsDisplaying;
			const valueChangeBy = Math.abs(currentValue - valueTo);

			// Im tracking the animation value to show the user a number of the value on the screen
			this.state.pointsAnim.addListener((progress) => {
				this.setState({ pointsDisplaying: progress.value });
			});

			Animated.timing(this.state.pointsAnim, {
				toValue: valueTo,
				duration: valueChangeBy * 1000 * this.state.animationDuration,
				useNativeDriver: false,
			}).start();
		});
	}

	addPoints(addedPoints) {
		const newPoints = this.state.points + addedPoints;
		this.setState({
			points: newPoints,
		});
		this.animateTo(newPoints);
	}

	isFull() {
		return this.state.pointsDisplaying >= maxPoints;
	}
	use() {
		if (this.isFull()) {
			const newValue = this.state.points - maxPoints;
			this.animateTo(newValue);
			this.setState({
				points: newValue,
			});
		} else {
			throw Error("Can't use points when counter is not full");
		}
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
