import React, { useRef } from 'react';
import { Button, StyleSheet, TouchableHighlight, View } from 'react-native';
import PropTypes from 'prop-types';

import Screen from '../components/Screen';
import CouponCounter from '../components/CouponCounter';
import Timer from '../components/Timer';
import state from '../BusinessLayer/Data/stateHandler';
import coupons from '../BusinessLayer/Data/couponsHandler';
import settings from '../config/settings';
import MainPicker from '../components/MainPicker';

const items = [
	{
		value: 1,
		label: 'I',
		points: 5,
	},
	{
		value: 2,
		label: 'Love',
		points: 10,
	},
	{
		value: 3,
		label: 'You',
		points: 20,
	},
];

export default function MainScreen({ navigation }) {
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
			<Timer style={styles.timer} />
			<View style={styles.couponContainer}>
				<TouchableHighlight onPress={getCoupon}>
					<CouponCounter ref={counter} />
				</TouchableHighlight>
			</View>
			<View style={styles.pickerBtnContainer}>
				<MainPicker addPoints={addPoints} items={items} />
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
		// marginTop: '30%',
		// marginBottom: '10%',
	},
});

MainScreen.propTypes = {
	navigation: PropTypes.object,
};
