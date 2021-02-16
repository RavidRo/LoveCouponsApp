import React from 'react';
import { View, StyleSheet, TouchableNativeFeedback } from 'react-native';
import PropTypes from 'prop-types';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import AppText from './AppText';
import colors from '../config/colors';

export default function DrawerButton({ onPress }) {
	return (
		<View style={styles.drawerButton}>
			<TouchableNativeFeedback onPress={onPress} useForeground={true}>
				<View style={styles.drawerIcon}>
					<AppText weight={'semiBold'}>Your Coupons</AppText>
					<MaterialCommunityIcons
						name={'chevron-right'}
						size={40}
						color={colors.medium}
					/>
				</View>
			</TouchableNativeFeedback>
		</View>
	);
}

const styles = StyleSheet.create({
	drawerIcon: {
		flexDirection: 'row-reverse',
		alignItems: 'center',
		justifyContent: 'center',
		paddingLeft: 15,
		overflow: 'hidden',
		borderRadius: 20,
	},
	drawerButton: {
		borderRadius: 20,
		backgroundColor: colors.pink_opacity,
		marginLeft: '12%',
		marginTop: '22%',
		alignSelf: 'flex-start',
		elevation: 16,
	},
});

DrawerButton.propTypes = {
	onPress: PropTypes.func,
};
