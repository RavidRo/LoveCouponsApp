import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';

import AppPicker from '../components/Picker/AppPicker';
import HeartButton from '../components/HeartButton';
import PickerItem from '../components/Picker/PickerItem';
import Screen from '../components/Screen';
import CouponCounter from '../components/CouponCounter';
import Timer from '../components/Timer';

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

export default function MainScreen() {
	const counter = useRef(null);
	return (
		<Screen style={styles.container}>
			<Timer style={styles.counter} />
			<View style={styles.couponContainer}>
				<CouponCounter ref={counter} />
			</View>
			<View style={styles.pickerBtnContainer}>
				<AppPicker
					PickerItemComponent={PickerItem}
					items={items}
					onSelectItem={(item) =>
						counter.current.addPoints(item.points)
					}
					CostumePickerButton={HeartButton}
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
	counter: {
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
