import React from 'react';
import PropTypes from 'prop-types';
import AppPicker from './Picker/AppPicker';
import HeartButton from './HeartButton';
import PickerItem from './Picker/PickerItem';

// TODO: Extract this to another file
export default function MainPicker({ addPoints, items }) {
	return (
		<AppPicker
			PickerItemComponent={PickerItem}
			items={items}
			onSelectItem={(item) => addPoints(item.points)}
			CostumePickerButton={HeartButton}
		/>
	);
}
MainPicker.propTypes = {
	addPoints: PropTypes.func.isRequired,
	items: PropTypes.array.isRequired,
};
