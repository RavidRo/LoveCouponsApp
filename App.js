import { StatusBar } from 'expo-status-bar';
import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import AppPicker from './app/components/Picker/AppPicker';
// import Counter from './app/components/Counter';
import HeartButton from './app/components/HeartButton';
import PickerItem from './app/components/Picker/PickerItem';
import CounterV2 from './app/components/CounterV2';

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

export default function App() {
	const counter = useRef(null);
	return (
		<View style={styles.container}>
			<CounterV2 ref={counter} />
			<AppPicker
				PickerItemComponent={PickerItem}
				items={items}
				onSelectItem={(item) => counter.current.addPoints(item.points)}
				CostumePickerButton={HeartButton}
			/>
			{/* <HeartButton
				onPress={() => {
					counter.current.addPoints(10);
				}}
			/> */}
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
