import React, { useRef } from 'react';
import { Button, StyleSheet, TouchableHighlight, View } from 'react-native';
import PropTypes from 'prop-types';

import AppPicker from '../components/Picker/AppPicker';
import HeartButton from '../components/HeartButton';
import PickerItem from '../components/Picker/PickerItem';
import Screen from '../components/Screen';
import CouponCounter from '../components/CouponCounter';
import Timer from '../components/Timer';
import state from '../BusinessLayer/Data/state';

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

	// To get a new coupon you need enough points,
	const getCoupon = () => {
		if (counter.isFull()) {
			console.log('New Coupon'); //TODO: create a new coupon here
			counter.use();
		}
	};

	return (
		<Screen style={styles.container}>
			<Button title="=>" onPress={navigation.openDrawer()} />
			<Timer style={styles.timer} />
			<View style={styles.couponContainer}>
				<TouchableHighlight onPress={getCoupon}>
					<CouponCounter ref={counter} />
				</TouchableHighlight>
			</View>
			<View style={styles.pickerBtnContainer}>
				<MainPicker addPoints={addPoints} />
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

// TODO: Extract this to another file
function MainPicker({ addPoints }) {
	return (
		<AppPicker
			PickerItemComponent={PickerItem}
			items={items}
			onSelectItem={(item) => addPoints(item.points)}
			CostumePickerButton={HeartButton}
		/>
	);
}
MainPicker.propTypes = {
	addPoints: PropTypes.func,
};
