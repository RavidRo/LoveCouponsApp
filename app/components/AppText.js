import * as Font from 'expo-font';

import React from 'react';
import { StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';

import fonts from '../config/fonts';
import colors from '../config/colors';
import { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';

function AppText({
	children,
	style,
	weight = 'regular',
	fontFamily = fonts.RUBIK,
	...otherProps
}) {
	// Loading all the fonts
	const isMountedRef = useRef(null);
	const [fontsLoaded, setFontLoaded] = useState(false);
	const _loadFontsAsync = async () => {
		await Font.loadAsync(fonts.fontsDict);
		if (isMountedRef.current) {
			setFontLoaded(true);
		}
	};
	useEffect(() => {
		isMountedRef.current = true;
		_loadFontsAsync();
		return () => (isMountedRef.current = false);
	}, []);

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
	children: PropTypes.string,
	style: PropTypes.object,
	weight: PropTypes.string,
	color: PropTypes.string,
	fontFamily: PropTypes.string,
};

export default AppText;
