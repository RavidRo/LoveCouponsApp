import React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import AppButton from './AppButton';

export default function DrawerButton({ onPress }) {
	return (
		<AppButton
			style={styles.drawerButton}
			icon={'chevron-right'}
			onPress={onPress}
			title={'Your Coupons'}
		/>
	);
}

const styles = StyleSheet.create({
	drawerButton: {
		marginLeft: '12%',
		marginTop: '22%',
		alignSelf: 'flex-start',
		elevation: 16,
	},
});

DrawerButton.propTypes = {
	onPress: PropTypes.func,
};
