import React, { useRef } from 'react';
import { Button, StyleSheet, TouchableHighlight, View } from 'react-native';
import PropTypes from 'prop-types';

import Screen from '../components/Screen';
import CouponCounter from '../components/CouponCounter';
import Timer from '../components/Timer';
import coupons from '../BusinessLayer/Data/CouponsHandler';
import settings from '../config/settings';
import ActsPicker from '../components/Acts/ActsPicker';
import { useState } from 'react';
import stateHandler from '../BusinessLayer/Data/StateHandler';
import { useEffect } from 'react';
import useInterval from '../Hooks/useInterval';
import colors from '../config/colors';

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
		stateHandler.addPoints(pointsToAdd);
	};

	const getCoupon = () => {
		if (counter.current.isFull()) {
			coupons.createNewCoupon(); //Creating the new coupon
			counter.current.usePoints(); //Remove the points from the points counter
			stateHandler.removePoints(settings.pointsForCoupon); //Save the new points value in the database
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
				<ActsPicker
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
		backgroundColor: colors.unknowngrey,
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
		width: '100%',
		alignItems: 'center'
	},
});

MainScreen.propTypes = {
	navigation: PropTypes.object,
};
