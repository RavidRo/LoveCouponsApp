import React from 'react';
import PropTypes from 'prop-types';
import AppPicker from './Picker/AppPicker';
import HeartButton from './HeartButton';
import PickerItem from './Picker/PickerItem';

// TODO: Extract this to another file
export default function MainPicker({ onSelect, items }) {
	return (
		<AppPicker
			PickerItemComponent={PickerItem}
			items={items}
			onSelectItem={(item) => onSelect(item.points)}
			CostumePickerButton={HeartButton}
		/>
	);
}
MainPicker.propTypes = {
	onSelect: PropTypes.func.isRequired,
	items: PropTypes.array.isRequired,
};
