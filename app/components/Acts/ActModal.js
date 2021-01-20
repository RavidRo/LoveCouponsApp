import { Modal, StyleSheet, View } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';

import colors from '../../config/colors';

export default function ActModal({ children }) {
	const hasChildren = Array.isArray(children)
		? children.some((value) => value)
		: children;
	return (
		hasChildren && (
			<Modal animationType={'fade'} transparent>
				<View style={styles.container}>{children}</View>
			</Modal>
		)
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
	children: PropTypes.node,
};
