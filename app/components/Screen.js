import React from 'react';
import Constants from 'expo-constants';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import PropTypes from 'prop-types';
import { StatusBar } from 'expo-status-bar';

export default function Screen({ children, style }) {
	return (
		<SafeAreaView style={[styles.screen, style]}>
			<View style={[styles.view, style]}>{children}</View>
			<StatusBar style="auto" />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	screen: {
		paddingTop: Constants.statusBarHeight,
		flex: 1,
	},
	view: {
		flex: 1,
		width: '100%',
	},
});

Screen.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]).isRequired,
	style: PropTypes.object,
};
