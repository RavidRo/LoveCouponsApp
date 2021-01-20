import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';

import AppPicker from '../Picker/AppPicker';
import HeartButton from '../HeartButton';
import PickerItem from '../Picker/PickerItem';
import Acts from '../../BusinessLayer/Acts/Acts';
import { FinishedModalActContext } from '../../BusinessLayer/Acts/ActsLogic';
import Loading from '../Loading';
import ActModal from './ActModal';

// TODO: Extract this to another file
export default function ActsPicker({ onSelect }) {
	const [modalItem, setModalItem] = useState(null);
	const [loading, setLoading] = useState(false);
	return (
		<>
			<AppPicker
				PickerItemComponent={PickerItem}
				items={Acts}
				onSelectItem={(item) => {
					if (item.modal) {
						setModalItem(item);
					} else {
						setLoading(true);
						item.act().then((response) => {
							setLoading(false);
							onSelect(response ? item.points : 0);
						});
					}
				}}
				CostumePickerButton={HeartButton}
			/>
			<ActModal>
				{modalItem && (
					<FinishedModalActContext.Provider
						value={(actPromise) => {
							setLoading(true);
							setModalItem(null);
							actPromise.then((success) => {
								setLoading(false);
								onSelect(success ? modalItem.points : 0);
							});
						}}
					>
						<modalItem.act />
					</FinishedModalActContext.Provider>
				)}
				{loading && <Loading />}
			</ActModal>
		</>
	);
}
ActsPicker.propTypes = {
	onSelect: PropTypes.func.isRequired,
};
