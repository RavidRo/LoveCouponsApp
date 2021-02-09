import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';

import AppPicker from '../Picker/AppPicker';
import PickerItem from '../Picker/PickerItem';
import Acts from '../../BusinessLayer/Acts/Acts';
import { FinishedModalActContext } from '../../BusinessLayer/Acts/ActsLogic';
import Loading from '../Loading';
import ActModal from './ActModal';
import TimerButton from '../TimerButton';
import useTimer from '../../Hooks/useTimer';
import settings from '../../config/settings';

export default function ActsPicker({ onSelect }) {
	const [modalItem, setModalItem] = useState(null);
	const [loading, setLoading] = useState(false);
	const [timeLeft, setTimeLeft] = useTimer();

	const act = (promise, points) => {
		setLoading(true);
		promise.then((response) => {
			setLoading(false);
			onSelect(response && timeLeft == 0 ? points : 0);
			setTimeLeft(settings.getPointsEvery);
		});
	};

	return (
		<>
			<AppPicker
				PickerItemComponent={PickerItem}
				items={Acts}
				onSelectItem={(item) => {
					if (item.modal) {
						setModalItem(item);
					} else {
						act(item.act(), item.points);
					}
				}}
				CostumePickerButton={TimerButton}
				timeLeft={timeLeft}
			/>
			<ActModal>
				{modalItem && (
					<FinishedModalActContext.Provider
						value={(actPromise) => {
							setModalItem(null);
							act(actPromise, modalItem.points);
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
