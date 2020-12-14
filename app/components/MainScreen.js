import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';

import AppPicker from './Picker/AppPicker';
import HeartButton from './HeartButton';
import PickerItem from './Picker/PickerItem';
import Counter from './Counter';
import Screen from './Screen';

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
			<Counter ref={counter} style={styles.counter} />
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
		flex: 1,
	},
	pickerBtnContainer: {
		marginBottom: '10%	',
	},
});
