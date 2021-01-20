import React from 'react';
import PropTypes from 'prop-types';
import { useContext } from 'react';

import { handleAct, FinishedModalActContext } from './ActsLogic';
import MessagesHandler from '../Data/MessagesHandler';
import AppTextInput from '../../components/AppTextInput';

function InputModal({ act, errorMsg, successMsg }) {
	const finished = useContext(FinishedModalActContext);
	const onSend = (text) => {
		if (text) {
			finished(
				handleAct(
					act(text).then(() => true),
					errorMsg,
					successMsg
				)
			);
		}
	};
	return (
		<AppTextInput onSend={onSend} icon={'send'} width="70%">
			A cute message!
		</AppTextInput>
	);
}
InputModal.propTypes = {
	act: PropTypes.func.isRequired,
	errorMsg: PropTypes.string.isRequired,
	successMsg: PropTypes.string.isRequired,
};

// * ------------------------- SEND COUPON ACT -------------------------
export function SendCouponActModal() {
	return (
		<InputModal
			act={MessagesHandler.sendCoupon}
			errorMsg={'An error occurred while trying to send a heart'}
			successMsg={'Coupon sent successfully'}
		/>
	);
}

// * ------------------------- SEND MESSAGE ACT -------------------------
export function SendMessageActModal() {
	return (
		<InputModal
			act={MessagesHandler.sendMessage}
			errorMsg={'An error occurred while trying to send your message'}
			successMsg={'Message sent successfully'}
		/>
	);
}
