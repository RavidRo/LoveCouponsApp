import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';

import AppPicker from '../Picker/AppPicker';
import HeartButton from '../HeartButton';
import PickerItem from '../Picker/PickerItem';
import Acts from '../../BusinessLayer/Acts/Acts';
import { FinishedModalActContext } from '../../BusinessLayer/Acts/ActsLogic';

// TODO: Extract this to another file
export default function ActsPicker({ onSelect }) {
	const [modalItem, setModalItem] = useState(null);
	return (
		<>
			<AppPicker
				PickerItemComponent={PickerItem}
				items={Acts}
				onSelectItem={(item) => {
					if (item.modal) {
						setModalItem(item);
					} else {
						item.act().then((response) =>
							onSelect(response ? item.points : 0)
						);
					}
				}}
				CostumePickerButton={HeartButton}
			/>
			{modalItem && (
				<FinishedModalActContext.Provider
					value={(success) => {
						setModalItem(null);
						onSelect(success ? modalItem.points : 0);
					}}
				>
					<modalItem.act />
				</FinishedModalActContext.Provider>
			)}
		</>
	);
}
ActsPicker.propTypes = {
	onSelect: PropTypes.func.isRequired,
};
