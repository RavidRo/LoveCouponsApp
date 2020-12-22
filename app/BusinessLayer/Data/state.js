import Firestore from './Firebase/Firestore';

// TODO: Need to handle exceptions when calling Firestore functions

const stateCollectionName = 'state';
const stateDocumentId = 'state';
const pointsField = 'points';
const lastTimeSentField = 'timeStamp';

// Caching
var state = null;

// Creates an initial state at the database and return it
function createStateObject() {
	state = {
		[pointsField]: 0,
		[lastTimeSentField]: null,
	};
	Firestore.addDocToCollection(stateCollectionName, state, stateDocumentId);
	return state;
}

// *--------------------------Public Functions--------------------------

// You can get the state field separately
//but for faster loading you should use this function when you want number of different fields at the same time
async function getStateDocument() {
	if (!state) {
		state = await Firestore.getDoc(stateCollectionName, stateDocumentId);
	}
	return state ? state : createStateObject();
}

async function getPoints() {
	return state ? state[pointsField] : (await getStateDocument())[pointsField];
}

async function getLastTimeSent() {
	return state
		? state[lastTimeSentField]
		: (await getStateDocument())[lastTimeSentField];
}

function addPoints(addBy) {
	state[pointsField] = state[pointsField] + addBy;
	state[lastTimeSentField] = new Date().getTime();

	return Firestore.incrementNumericField(
		stateCollectionName,
		stateDocumentId,
		pointsField,
		addBy
	);
}

export default {
	getStateDocument,
	getPoints,
	getLastTimeSent,
	addPoints,
};
