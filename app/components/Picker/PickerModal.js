import React from 'react';
import { Button, Modal, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import Screen from '../Screen';

export default function PickerModal({
	visible,
	onClose,
	data,
	numberOfColumns,
	PickerItemComponent,
	onSelectItem,
}) {
	return (
		<Modal visible={visible} animationType="slide">
			<Screen>
				<Button title="Close" onPress={onClose} />
				<FlatList
					data={data}
					keyExtractor={(item) => item.value.toString()}
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
			</Screen>
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
			value: PropTypes.number.isRequired,
			label: PropTypes.string.isRequired,
		}).isRequired
	).isRequired,
	numberOfColumns: PropTypes.number,
	PickerItemComponent: PropTypes.elementType.isRequired,
	onSelectItem: PropTypes.func.isRequired,
	onClose: PropTypes.func.isRequired,
};
