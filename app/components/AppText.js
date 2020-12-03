import { useFonts } from 'expo-font';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';

import fonts from '../config/fonts';
import colors from '../config/colors';

function AppText({
	children,
	style,
	weight = 'regular',
	fontFamily = fonts.RUBIK,
	...otherProps
}) {
	// Loading all the fonts
	const [fontsLoaded] = useFonts(fonts.fontsDict);

	return (
		<Text
			style={[
				styles.text,
				{
					fontFamily: fontsLoaded
						? fonts.getFontFamily(fontFamily, weight)
						: null,
				},
				style,
			]}
			{...otherProps}
		>
			{children}
		</Text>
	);
}

const styles = StyleSheet.create({
	text: {
		fontSize: 20,
		color: colors.black,
	},
});

AppText.propTypes = {
	children: PropTypes.string.isRequired,
	style: PropTypes.object,
	weight: PropTypes.string,
	color: PropTypes.string,
	fontFamily: PropTypes.string,
};

export default AppText;
