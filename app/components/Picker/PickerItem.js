import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import AppText from '../AppText';

export default function PickerItem({ onPress, label }) {
	return (
		<TouchableOpacity onPress={onPress}>
			<AppText style={styles.text}>{label}</AppText>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	text: {
		padding: 20,
	},
});

PickerItem.propTypes = {
	onPress: PropTypes.func,
	label: PropTypes.string.isRequired,
};
