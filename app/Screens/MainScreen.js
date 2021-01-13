import React, { useRef } from 'react';
import { Button, StyleSheet, TouchableHighlight, View } from 'react-native';
import PropTypes from 'prop-types';

import Screen from '../components/Screen';
import CouponCounter from '../components/CouponCounter';
import Timer from '../components/Timer';
import state from '../BusinessLayer/Data/StateHandler';
import coupons from '../BusinessLayer/Data/CouponsHandler';
import settings from '../config/settings';
import MainPicker from '../components/MainPicker';
import { useState } from 'react';
import stateHandler from '../BusinessLayer/Data/StateHandler';
import { useEffect } from 'react';
import useInterval from '../Hooks/useInterval';
import acts from '../BusinessLayer/Acts';

export default function MainScreen({ navigation }) {
	// Time control logic:
	const [timeLeft, setTimeLeft] = useState(settings.getPointsEvery); // 1) Set the initial time to 0
	useInterval(() => {
		if (timeLeft > 0) {
			setTimeLeft(timeLeft - 1);
		}
	}, 1000); // 2) Remove 1 second every second
	// 3) Synchronize with database
	useEffect(() => {
		stateHandler.getLastTimeSent().then((time) => {
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

	const counter = useRef(null);

	const addPoints = (pointsToAdd) => {
		counter.current.addPoints(pointsToAdd);
		state.addPoints(pointsToAdd);
	};

	const getCoupon = () => {
		if (counter.current.isFull()) {
			coupons.createNewCoupon(); //Creating the new coupon
			counter.current.usePoints(); //Remove the points from the points counter
			state.removePoints(settings.pointsForCoupon); //Save the new points value in the database
		}
	};

	return (
		<Screen style={styles.container}>
			<Button title="=>" onPress={() => navigation.openDrawer()} />
			<Timer style={styles.timer} timeLeft={timeLeft} />
			<View style={styles.couponContainer}>
				<TouchableHighlight onPress={getCoupon}>
					<CouponCounter ref={counter} />
				</TouchableHighlight>
			</View>
			<View style={styles.pickerBtnContainer}>
				<MainPicker
					items={acts}
					onSelect={(points) => {
						if (timeLeft <= 0 && points > 0) {
							addPoints(points);
							setTimeLeft(settings.getPointsEvery);
						}
					}}
				/>
			</View>
		</Screen>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
	},
	timer: {
		marginTop: '20%',
		flex: 0.25,
	},
	couponContainer: {
		flex: 0.49,
	},
	pickerBtnContainer: {
		flex: 0.06,
	},
});

MainScreen.propTypes = {
	navigation: PropTypes.object,
};
