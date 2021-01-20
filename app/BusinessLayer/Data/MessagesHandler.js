import { Firestore } from './Firebase/Firebase';

const messagesCollectionName = 'messages';
const sentCouponsCollectionName = 'sentCoupons';
const heartsCollectionName = 'hearts';
const countFieldName = 'count';

function sendMessage(description) {
	if (!description) {
		throw new Error('Message must not be empty');
	}
	return Firestore.addDocToCollection(messagesCollectionName, {
		description,
	});
}
function sendCoupon(description) {
	if (!description) {
		throw new Error('Message must not be empty');
	}
	return Firestore.addDocToCollection(sentCouponsCollectionName, {
		description,
	});
}

function sendHeart() {
	return Firestore.incrementNumericField(
		heartsCollectionName,
		heartsCollectionName,
		countFieldName,
		1
	);
}

export default {
	sendMessage,
	sendCoupon,
	sendHeart,
};
