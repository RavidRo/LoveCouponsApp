import { StatusBar } from 'expo-status-bar';
import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import Counter from './app/components/Counter';
import HeartButton from './app/components/HeartButton';

export default function App() {
	const counter = useRef(null);
	return (
		<View style={styles.container}>
			<Counter ref={counter} />
			<HeartButton
				onPress={() => {
					counter.current.addPoints(10);
				}}
			/>
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
