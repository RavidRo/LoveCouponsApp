import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import AppText from '../AppText';
import colors from '../../config/colors';

export default function PickerItem({ onPress, label, points, icon, width }) {
	const styles = StyleSheet.create({
		container: {
			width: width,
			padding: 20,
			alignItems: 'center',
		},
		text: {
			fontSize: 18,
		},
		points: {
			// color: colors.medium,
		},
		textIconContainer: {
			alignItems: 'center',
			flexDirection: 'row-reverse',
		},
		icon: {
			paddingRight: 5,
		},
	});

	return (
		<TouchableOpacity onPress={onPress} style={styles.container}>
			<View style={styles.textIconContainer}>
				{icon && (
					<MaterialCommunityIcons
						name={icon}
						size={30}
						color={colors.medium}
						style={styles.icon}
					/>
				)}
				<AppText style={styles.text} weight={'medium'}>
					{label}
				</AppText>
			</View>
			<AppText
				weight={'semiBold'}
				style={styles.points}
			>{`+${points.toString()}`}</AppText>
		</TouchableOpacity>
	);
}

PickerItem.propTypes = {
	onPress: PropTypes.func,
	label: PropTypes.string.isRequired,
	points: PropTypes.number,
	icon: PropTypes.string,
	width: PropTypes.string.isRequired,
};
