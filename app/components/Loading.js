import React from 'react';
import { StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

const animation = require('../assets/Animations/loading.json');
export default function Loading() {
	return (
		<LottieView source={animation} autoPlay loop style={styles.animation} />
	);
}

const styles = StyleSheet.create({
	animation: {},
});
