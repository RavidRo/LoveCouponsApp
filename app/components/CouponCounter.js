import React, { Component } from 'react';
import PropTypes from 'prop-types';
import eases from 'eases';

import CouponSVG from './SVG/CouponSVG';
import settings from '../config/settings';
import stateHandler from '../BusinessLayer/Data/StateHandler';

const maxPoints = settings.pointsForCoupon;

export default class CouponCounter extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: 0,
		};
		this.stop = true;
		this.start = 0;
		this.end = 0;
		this.duration = (props.animationDuration || 3) * 1000;
		// Synchronize state with database
		stateHandler.getPoints().then((points) => {
			this.start = points;
			this.end = points;
			this.setState({ value: points });
		});
	}

	componentDidMount() {
		requestAnimationFrame(this.animate.bind(this));
	}

	animate() {
		requestAnimationFrame(this.animate.bind(this));
		if (!this.stop) this.draw();
	}

	draw() {
		const { start, end } = this;

		const time = this.duration;
		const now = Date.now();
		if (now - this.startTime >= time) this.stop = true;
		const percentage = Math.min((now - this.startTime) / time, 1);
		const easeVal = eases['cubicOut'](percentage);
		const value = start + (end - start) * easeVal;

		this.setState({ value });
	}

	addPoints(addedPoints) {
		this.startTime = Date.now();
		this.start = this.end;
		this.end += addedPoints;
		this.stop = false;
	}

	isFull() {
		return this.end >= maxPoints;
	}

	usePoints() {
		if (this.isFull()) {
			this.addPoints(maxPoints * -1);
		} else {
			throw Error("Can't use points when counter is not full");
		}
	}

	render() {
		return (
			<CouponSVG
				currentPoints={this.state.value.toFixed(0)}
				maxPoints={maxPoints}
			/>
		);
	}
}

CouponCounter.propTypes = {
	animationDuration: PropTypes.number,
	style: PropTypes.object,
};
