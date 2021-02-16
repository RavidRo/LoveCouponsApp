import React from 'react';
import { View, StyleSheet, TouchableNativeFeedback } from 'react-native';
import PropTypes from 'prop-types';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import AppText from './AppText';
import colors from '../config/colors';

export default function AppButton({
	onPress,
	textWeight = 'semiBold',
	textStyle,
	icon,
	iconColor = colors.medium,
	title,
	borderRadius = 20,
	style,
}) {
	const styles = StyleSheet.create({
		textIcon: {
			flexDirection: 'row-reverse',
			alignItems: 'center',
			justifyContent: 'center',
			paddingLeft: 15,
			paddingRight: icon ? 0 : 15,
			overflow: 'hidden',
			borderRadius: borderRadius,
		},
		container: {
			borderRadius: borderRadius,
			backgroundColor: colors.pink_opacity,
		},
	});
	return (
		<View style={[styles.container, style]}>
			<TouchableNativeFeedback onPress={onPress} useForeground={true}>
				<View style={styles.textIcon}>
					<AppText weight={textWeight} style={textStyle}>
						{title}
					</AppText>
					{icon && (
						<MaterialCommunityIcons
							name={icon}
							size={40}
							color={iconColor}
						/>
					)}
				</View>
			</TouchableNativeFeedback>
		</View>
	);
}

AppButton.propTypes = {
	onPress: PropTypes.func,
	textWeight: PropTypes.string,
	textStyle: PropTypes.object,
	icon: PropTypes.string,
	iconColor: PropTypes.string,
	title: PropTypes.string,
	borderRadius: PropTypes.number,
	style: PropTypes.object,
};
