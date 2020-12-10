import React, { useState } from 'react';
import PropTypes from 'prop-types';

import PickerItem from './PickerItem';
import PickerModal from './PickerModal';
import PickerButton from './PickerButton';

export default function AppPicker({
	icon,
	items,
	numberOfColumns = 1,
	onSelectItem, //A function that gets an item from items at decides what to do with it when ist picked
	PickerItemComponent = PickerItem,
	placeholder,
	selectedItem, //The selected item label to show ain the button
	width = '100%',
	CostumePickerButton = PickerButton,
	...otherProps //You can add more props in case the costume button need costume props
}) {
	const [modalVisible, setModalVisible] = useState(false);

	return (
		<>
			<CostumePickerButton
				icon={icon}
				onPress={() => setModalVisible(true)}
				placeholder={placeholder}
				selectedItem={selectedItem}
				width={width}
				{...otherProps}
			/>
			<PickerModal
				visible={modalVisible}
				PickerItemComponent={PickerItemComponent}
				data={items}
				numberOfColumns={numberOfColumns}
				onClose={() => setModalVisible(false)}
				onSelectItem={onSelectItem}
			/>
		</>
	);
}

AppPicker.propTypes = {
	icon: PropTypes.string,
	items: PropTypes.arrayOf(
		PropTypes.shape({
			value: PropTypes.number.isRequired,
			label: PropTypes.string.isRequired,
		}).isRequired
	).isRequired,
	numberOfColumns: PropTypes.number,
	placeholder: PropTypes.string,
	width: PropTypes.string,
	PickerItemComponent: PropTypes.elementType,
	selectedItem: PropTypes.string,
	onSelectItem: PropTypes.func.isRequired,
	CostumePickerButton: PropTypes.elementType,
};
