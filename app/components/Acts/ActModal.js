import { Modal, StyleSheet, View } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';

import colors from '../../config/colors';
import AppButton from '../AppButton';
import { StatusBar } from 'react-native';

export default function ActModal({ children, cancel }) {
	const hasChildren = Array.isArray(children)
		? children.some((value) => value)
		: children;
	return (
		<>
			<StatusBar hidden={hasChildren} barStyle={'dark-content'} />
			<Modal animationType={'fade'} transparent visible={hasChildren}>
				<View style={styles.container}>
					{cancel && (
						<View style={styles.buttonContainer}>
							<AppButton
								title={'Cancel'}
								style={styles.cancelButton}
								textStyle={styles.cancelButtonText}
								onPress={cancel}
							/>
						</View>
					)}
					<View style={styles.childrenContainer}>{children}</View>
				</View>
			</Modal>
		</>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.medium_04,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row-reverse',
		// paddingTop: '50%',
	},
	cancelButton: {
		backgroundColor: colors.pink,
	},
	buttonContainer: {
		position: 'absolute',
		bottom: '30%',
		alignSelf: 'flex-end',
	},
	cancelButtonText: {
		fontSize: 24,
	},
	childrenContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
ActModal.propTypes = {
	children: PropTypes.node,
	cancel: PropTypes.func,
};
