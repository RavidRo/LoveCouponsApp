import React from 'react';
import { StyleSheet, TouchableNativeFeedback } from 'react-native';
import PropTypes from 'prop-types';
import Timer from './Timer';
import {useEffect, useState} from 'react';
import useInterval from '../Hooks/useInterval';
import StateHandler from '../BusinessLayer/Data/StateHandler';
import settings from '../config/settings';


export default function TimerButton({onPress}) {
	// Time control logic:
	const [timeLeft, setTimeLeft] = useState(settings.getPointsEvery); // 1) Set the initial time to 0
	useInterval(() => {
		if (timeLeft > 0) {
			setTimeLeft(timeLeft - 1);
		}
	}, 1000); // 2) Remove 1 second every second
	// 3) Synchronize with database
	useEffect(() => {
		StateHandler.getLastTimeSent().then((time) => {
			if (time) {
				const timeSince = Math.round(
					new Date().getTime() / 1000 - time.seconds
				);
				const timeLeft = Math.max(
					settings.getPointsEvery - timeSince,
					0
				);
				setTimeLeft(timeLeft);
			} else {
				setTimeLeft(0);
			}
		});
	}, []);

	return <TouchableNativeFeedback onPress={onPress}>
		<Timer timeLeft={timeLeft} />
	</TouchableNativeFeedback>;
}

const styles = StyleSheet.create({
	container: {},
});

TimerButton.propTypes = {
	onPress: PropTypes.func
};