import * as firebase from 'firebase';
import firebaseConfig from '../../../config/firebaseConfig';
import 'firebase/firestore';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const FieldValue = firebase.firestore.FieldValue;

// I don't know at this level how to handle an error.
// I do want to know where the error occurred so im logging it and throws it again.
function handleError(functionName, error) {
	console.log(`Error at Firestore/${functionName}`, error);
	throw error;
}

// Get the reference to a specific doc
function getRef(collection, docId) {
	return db.collection(collection).doc(docId);
}

// *--------------------------Public Functions--------------------------

function addDocToCollection(collection, doc) {
	return db
		.collection(collection)
		.add(doc)
		.catch((error) => handleError('addDocToCollection', error));
}

function getDoc(collection, docId) {
	return getRef(collection, docId)
		.get()
		.then((snapshot) => snapshot.data())
		.catch((error) => handleError('getDocSnapshot', error));
}

function updateADocument(collection, docId, data) {
	return getRef(collection, docId)
		.update(data)
		.catch((error) => handleError('updateADocument', error));
}

function incrementNumericField(collection, docId, field, incrementBy) {
	return getRef(collection, docId)
		.update({
			[field]: FieldValue.increment(incrementBy),
			timestamp: FieldValue.serverTimestamp(),
		})
		.catch((error) => handleError('incrementNumericField', error));
}

export default {
	addDocToCollection,
	getDoc,
	updateADocument,
	incrementNumericField,
};
