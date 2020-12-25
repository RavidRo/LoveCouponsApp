import Firestore from './Firebase/Firestore';

// TODO: Need to handle exceptions when calling Firestore functions

const stateCollectionName = 'state';
const stateDocumentId = 'state';
const pointsField = 'points';
const lastTimeSentField = 'timestamp';

// Caching
let state = null;

// Creates an initial state at the database and return it
function initialStateObject() {
	state = {
		[pointsField]: 0,
		[lastTimeSentField]: null,
	};
	Firestore.addDocToCollection(stateCollectionName, state, stateDocumentId);
}

async function loadState() {
	if (!state) {
		const resultState = await Firestore.getDoc(
			stateCollectionName,
			stateDocumentId
		);
		state = resultState ? resultState : initialStateObject();
	}
}

// *--------------------------Public Functions--------------------------
async function getState() {
	await loadState();
	return state;
}

async function getPoints() {
	await loadState();
	return state[pointsField];
}

async function getLastTimeSent() {
	await loadState();
	return state[lastTimeSentField];
}

async function addPoints(addBy) {
	await loadState();

	const newPointsValue = state[pointsField] + addBy;

	// Update locally
	state[pointsField] = newPointsValue;
	state[lastTimeSentField] = new Date().getTime();

	// Update remotely
	return Firestore.updateDocument(stateCollectionName, stateDocumentId, {
		[pointsField]: newPointsValue,
	});
}

async function removePoints(removeBy) {
	addPoints(-1 * removeBy);
}

export default {
	getState,
	getPoints,
	getLastTimeSent,
	addPoints,
	removePoints,
};
