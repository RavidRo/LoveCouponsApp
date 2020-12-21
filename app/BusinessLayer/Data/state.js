import Firestore from './Firebase/Firestore';

const stateCollectionName = 'state';
const stateDocumentId = 'state';
const pointsField = 'points';
const lastTimeSentField = 'timeStamp';

const createStateObject = () => ({
	[pointsField]: 0,
	[lastTimeSentField]: null,
});

// You can get the state field separately
//but for faster loading you should use this function when you want number of different fields at the same time
async function getStateDocument() {
	const stateObject = await Firestore.getDoc(
		stateCollectionName,
		stateDocumentId
	);
	return stateObject ? stateObject : createStateObject();
}

async function getPoints() {
	return (await getStateDocument())[pointsField];
}

async function getLastTimeSent() {
	return (await getStateDocument())[lastTimeSentField];
}

function addPoints(addBy) {
	return Firestore.incrementNumericField(
		stateCollectionName,
		stateDocumentId,
		pointsField,
		addBy,
	);
}

export default {
	getStateDocument,
	getPoints,
	getLastTimeSent,
	addPoints,
};
