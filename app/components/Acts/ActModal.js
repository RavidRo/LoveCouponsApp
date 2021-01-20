import { Modal, StyleSheet, View } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';

import colors from '../../config/colors';

export default function ActModal({ children }) {
	return (
		<Modal animationType={'fade'} transparent>
			<View style={styles.container}>{children}</View>
		</Modal>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.medium_04,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
ActModal.propTypes = {
	children: PropTypes.node.isRequired,
};
