import { useRef } from 'react';
import { useState, useEffect } from 'react';
import { AppState } from 'react-native';
import StateHandler from '../BusinessLayer/Data/StateHandler';
import settings from '../config/settings';
import useInterval from './useInterval';

export default function useTimer() {
	// Time control logic:
	const [timeLeft, setTimeLeft] = useState(settings.getPointsEvery); // 1) Set the initial time to 0
	const loadTime = () => {
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
	};
	useInterval(() => {
		if (timeLeft > 0) {
			setTimeLeft(timeLeft - 1);
		}
	}, 1000); // 2) Remove 1 second every second
	// 3) Synchronize with database
	useEffect(() => {
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
			console.log('App has come to the foreground!');
		}

		appState.current = nextAppState;
		console.log('AppState', appState.current);
	};
	useEffect(() => {
		AppState.addEventListener('change', _handleAppStateChange);

		return () => {
			AppState.removeEventListener('change', _handleAppStateChange);
		};
	}, []);

	return [timeLeft, setTimeLeft];
}
