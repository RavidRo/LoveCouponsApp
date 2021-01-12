import React from 'react';
import { Button, Modal, FlatList, View } from 'react-native';
import PropTypes from 'prop-types';
import colors from '../../config/colors';

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
				<Button title="Close" onPress={onClose} />
				<FlatList
					data={data}
					keyExtractor={(_, index) => index.toString()}
					numColumns={numberOfColumns}
					renderItem={({ item }) => (
						<PickerItemComponent
							label={item.label}
							onPress={() => {
								onClose();
								onSelectItem(item);
							}}
						/>
					)}
				/>
			</View>
		</Modal>
	);
}

// const styles = StyleSheet.create({
// 	container: {},
// });

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
