import React from 'react';
import {
	Modal,
	FlatList,
	View,
	StyleSheet,
	TouchableNativeFeedback,
} from 'react-native';
import PropTypes from 'prop-types';
import colors from '../../config/colors';
import AppText from '../AppText';

export default function PickerModal({
	visible,
	onClose,
	data,
	numberOfColumns,
	PickerItemComponent,
	onSelectItem,
}) {
	return (
		<Modal visible={visible} animationType="slide" transparent>
			<View
				style={{
					marginTop: '100%',
					backgroundColor: colors.light,
					flex: 1,
				}}
			>
				<TouchableNativeFeedback onPress={onClose}>
					<View style={styles.button}>
						<AppText weight={'medium'}>Close</AppText>
					</View>
				</TouchableNativeFeedback>
				<FlatList
					data={data}
					keyExtractor={(_, index) => index.toString()}
					numColumns={numberOfColumns}
					renderItem={({ item }) => (
						<PickerItemComponent
							{...item}
							onPress={() => {
								onClose();
								onSelectItem(item);
							}}
							width={`${100 / numberOfColumns}%`}
						/>
					)}
				/>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	button: {
		alignItems: 'center',
		padding: 10,
		// borderWidth: 1,
		backgroundColor: colors.blue,
		borderColor: colors.blue,
	},
});

PickerModal.propTypes = {
	visible: PropTypes.bool.isRequired,
	data: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.string.isRequired,
		}).isRequired
	).isRequired,
	numberOfColumns: PropTypes.number,
	PickerItemComponent: PropTypes.elementType.isRequired,
	onSelectItem: PropTypes.func.isRequired,
	onClose: PropTypes.func.isRequired,
};
