import { Firestore } from './Firebase/Firebase';

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

// *--------------------------Public Functions--------------------------
/**
 * Loads all the data from the server locally
 */
async function loadState() {
	if (!state) {
		const resultState = await Firestore.getDoc(
			stateCollectionName,
			stateDocumentId
		);
		state = resultState ? resultState : initialStateObject();
	}
}

// ! I'm not sure that "lastTimeEarned" is of type Date
/**
 * Retrieves the user state from the database or cache
 * For now the user state includes points and the last time the user earned points
 * @async
 * @returns {{points: Number, lastTimeEarned: Date}}
 */
async function getState() {
	await loadState();
	return state;
}

/**
 * Retrieves the user points from the database or cache
 * @async
 * @returns {Promise<Number>} The user current points
 */
async function getPoints() {
	await loadState();
	return state[pointsField];
}

// ! I'm not sure the return value is of type Date
/**
 * Retrieves the last time the user earned points from the database or cache
 * @async
 * @returns {Promise<Date>} The last time the user earned some points or null if never sent.
 */
async function getLastTimeSent() {
	await loadState();
	return state[lastTimeSentField];
}

/**
 * Add points to the user and saves it in the cache and database
 * @async
 * @param {Number} addBy The number of points the user gained. The value may be negative.
 */
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

/**
 * Remove points from the user and saves it in the cache and database.
 *
 * This is just the function `addPoints` called with a negative value
 * @async
 * @param {Number} removeBy The number of points the user lost. The value may be negative.
 *
 */
async function removePoints(removeBy) {
	addPoints(-1 * removeBy);
}

export default {
	getState,
	getPoints,
	getLastTimeSent,
	addPoints,
	removePoints,
	loadState,
};
