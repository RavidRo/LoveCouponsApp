import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

import AppText from '../AppText';
import colors from '../../config/colors';

export default function PickerButton({
	width,
	onPress,
	icon,
	selectedItem,
	placeholder,
}) {
	return (
		<View style={[styles.container, { width }]}>
			<TouchableWithoutFeedback onPress={onPress}>
				<View style={[styles.bar, { width }]}>
					{icon && (
						<MaterialCommunityIcons
							name={icon}
							size={20}
							color={colors.medium}
							style={styles.icon}
						/>
					)}
					{selectedItem ? (
						<AppText style={styles.text}>
							{selectedItem.label}
						</AppText>
					) : (
						<AppText style={styles.placeholder}>
							{placeholder}
						</AppText>
					)}

					<MaterialCommunityIcons
						name="chevron-down"
						size={20}
						color={colors.medium}
					/>
				</View>
			</TouchableWithoutFeedback>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.light,
		borderRadius: 25,
		marginVertical: 10,
		overflow: 'hidden',
	},
	bar: {
		flexDirection: 'row',
		padding: 15,
	},
	icon: {
		marginRight: 10,
	},
	placeholder: {
		color: colors.medium,
		flex: 1,
	},
	text: {
		flex: 1,
	},
});

PickerButton.propTypes = {
	icon: PropTypes.string,
	placeholder: PropTypes.string,
	width: PropTypes.string,
	selectedItem: PropTypes.string,
	onPress: PropTypes.func,
};
