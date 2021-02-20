import { useRef } from 'react';
import { useState, useEffect } from 'react';
import { AppState } from 'react-native';
import StateHandler from '../BusinessLayer/Data/StateHandler';
import settings from '../config/settings';
import useInterval from './useInterval';

export default function useTimer() {
	// Time control logic:
	const [timeLeft, setTimeLeft] = useState(settings.getPointsEvery); // 1) Set the initial time to 0
	const [delay, setDelay] = useState(null);
	useInterval(() => {
		if (timeLeft > 0) {
			setTimeLeft(timeLeft - 1);
		}
	}, delay);
	const startTimer = () => setDelay(1000);
	const stopTimer = () => setDelay(null);

	const loadTime = () => {
		StateHandler.getLastTimeSent().then((time) => {
			stopTimer();
			if (time) {
				const timeSince = Math.round(
					new Date().getTime() / 1000 - time
				);
				const _timeLeft = Math.max(
					settings.getPointsEvery - timeSince,
					0
				);
				setTimeLeft(_timeLeft);
			} else {
				setTimeLeft(0);
			}
			startTimer();
		});
	};

	useEffect(() => {
		startTimer();
		loadTime();
	}, []);

	// Check if the app is on foreground
	// If it is back then load time again
	const appState = useRef(AppState.currentState);

	const _handleAppStateChange = (nextAppState) => {
		if (
			appState.current.match(/inactive|background/) &&
			nextAppState === 'active'
		) {
			loadTime();
			// setTimeLeft(500);
		}

		appState.current = nextAppState;
		// console.log('AppState', appState.current);
	};
	useEffect(() => {
		AppState.addEventListener('change', _handleAppStateChange);

		return () => {
			AppState.removeEventListener('change', _handleAppStateChange);
		};
	}, []);

	return [timeLeft, setTimeLeft];
}
