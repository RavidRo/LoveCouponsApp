import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import AppText from './AppText';
import PropTypes from 'prop-types';

const maxPoints = 100;

const state = Object.freeze({
	SLEEPING: 0,
	COUNTING: 1,
});
export default class Counter extends Component {
	constructor(props) {
		super(props);
		this.state = {
			points: 0,
			pointsDisplaying: 0,
			state: state.SLEEPING,
			countingSpeed: props.countingSpeed || 99999,
		};
	}

	// Incrementing only after the state is updated
	componentDidUpdate(_, prevState) {
		if (prevState.pointsDisplaying !== this.state.pointsDisplaying) {
			if (this.state.pointsDisplaying !== this.state.points) {
				// Creating a counter affect by using the time out
				setTimeout(
					() =>
						this.setState({
							pointsDisplaying: this.state.pointsDisplaying + 1,
						}),
					100 / this.state.countingSpeed
				);
			} else {
				this.setState({ state: state.SLEEPING });
			}
		}
	}

	componentWillUnmount() {}

	addPoints(addedPoints) {
		this.setState({ points: this.state.points + addedPoints });
		// We don't want to start counting when we are already counting
		if (this.state.state !== state.COUNTING) {
			console.log('Starting to count');
			this.setState({ state: state.COUNTING });
			// Im adding here by now to trigger the onUpdate method and start the counting
			this.setState({
				pointsDisplaying: this.state.pointsDisplaying + 1,
			});
		}
	}

	render() {
		return (
			<AppText
				style={styles.text}
			>{`${this.state.pointsDisplaying}/${maxPoints}`}</AppText>
		);
	}
}

const styles = StyleSheet.create({
	text: {},
});

Counter.propTypes = {
	countingSpeed: PropTypes.number,
};
