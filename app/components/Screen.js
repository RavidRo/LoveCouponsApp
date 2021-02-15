import React from 'react';
import Constants from 'expo-constants';
import { StyleSheet, SafeAreaView, View, ImageBackground } from 'react-native';
import PropTypes from 'prop-types';
import { StatusBar } from 'expo-status-bar';
import colors from '../config/colors';

export default function Screen({
	children,
	style,
	backgroundImage,
	backgroundImageOpacity = 1,
	backgroundColor = colors.white,
}) {
	return (
		<ImageBackground
			source={backgroundImage}
			style={[styles.image, { backgroundColor: backgroundColor }]}
			imageStyle={{ opacity: backgroundImageOpacity }}
		>
			<SafeAreaView style={[styles.screen, style]}>
				<View style={[styles.view, style]}>{children}</View>
				<StatusBar style="auto" />
			</SafeAreaView>
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	image: {
		flex: 1,
		resizeMode: 'cover',
	},
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
	backgroundImage: PropTypes.any,
	backgroundImageOpacity: PropTypes.number,
	backgroundColor: PropTypes.string,
};
