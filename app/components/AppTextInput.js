import { useFonts } from 'expo-font';
import React, { useState } from 'react';
import {
	View,
	TextInput,
	StyleSheet,
	TouchableNativeFeedback,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

import colors from '../config/colors';
import fonts from '../config/fonts';

const placeHolderColor = colors.medium;
const iconSize = 30;
const textColor = colors.black;

const autoHeight = 35; // Don't change this. If you will change it the height will just jiggle on start

function AppTextInput({
	children,
	icon,
	onSend,
	width = '100%',
	numberOfLines = 1,
	fontSize = 20,
	weight = 'regular',
	fontFamily = fonts.RUBIK,
	...otherProps
}) {
	// Loading all the fonts
	const [fontsLoaded] = useFonts(fonts.fontsDict);
	const [height, setHeight] = useState(autoHeight);
	const [text, setText] = useState('');

	return (
		<View style={[styles.container, { width }]}>
			<TouchableNativeFeedback onPress={() => onSend(text)}>
				<View style={styles.iconContainer}>
					<MaterialCommunityIcons
						name={icon}
						size={iconSize}
						color={'black'}
					/>
				</View>
			</TouchableNativeFeedback>
			<TextInput
				placeholder={children}
				placeholderTextColor={placeHolderColor}
				numberOfLines={numberOfLines}
				multiline
				autoFocus={true}
				style={[
					{
						fontSize: fontSize,
						fontFamily: fontsLoaded
							? fonts.getFontFamily(fontFamily, weight)
							: null,
						height: numberOfLines
							? Math.max(autoHeight * numberOfLines, height)
							: height,
					},
					styles.text,
				]}
				onContentSizeChange={(e) =>
					setHeight(e.nativeEvent.contentSize.height)
				}
				onChangeText={setText}
				{...otherProps}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row-reverse',
		paddingVertical: 5,
		paddingHorizontal: 10,
		alignItems: 'center',
		borderColor: colors.black,
		borderWidth: 2,
		backgroundColor: colors.white,
		borderRadius: 30,
	},
	iconContainer: {
		borderBottomColor: colors.black,
		borderWidth: 1,
		borderRadius: 100,
		width: 1.4 * iconSize,
		height: 1.4 * iconSize,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: colors.pink,
		marginLeft: 10,
	},
	text: {
		flex: 1,
		color: textColor,
	},
});

AppTextInput.propTypes = {
	children: PropTypes.string,
	style: PropTypes.object,
	weight: PropTypes.string,
	fontFamily: PropTypes.string,
	icon: PropTypes.string.isRequired,
	width: PropTypes.string,
	numberOfLines: PropTypes.number,
	fontSize: PropTypes.number,
	onSend: PropTypes.func.isRequired,
};

export default AppTextInput;
