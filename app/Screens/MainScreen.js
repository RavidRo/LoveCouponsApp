import React, { useRef } from 'react';
import { Button, StyleSheet, TouchableHighlight, View } from 'react-native';
import PropTypes from 'prop-types';

import Screen from '../components/Screen';
import CouponCounter from '../components/CouponCounter';
import coupons from '../BusinessLayer/Data/CouponsHandler';
import settings from '../config/settings';
import ActsPicker from '../components/Acts/ActsPicker';
import stateHandler from '../BusinessLayer/Data/StateHandler';
import colors from '../config/colors';

export default function MainScreen({ navigation }) {
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
			<View style={styles.couponContainer}>
				<TouchableHighlight onPress={getCoupon}>
					<CouponCounter ref={counter} />
				</TouchableHighlight>
			</View>
			<View style={styles.pickerBtnContainer}>
				<ActsPicker
					onSelect={(points) => {
						if (points > 0) {
							addPoints(points);
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
	couponContainer: {
		marginTop: '50%',
		flex: 0.6,
	},
	pickerBtnContainer: {
		flex: 0.2,
		width: '100%',
		alignItems: 'center',
	},
});

MainScreen.propTypes = {
	navigation: PropTypes.object,
};
