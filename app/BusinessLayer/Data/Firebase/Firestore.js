import * as firebase from 'firebase';
import 'firebase/firestore';

import firebaseConfig from '../../../config/firebaseConfig';
import './FirebaseTimerFix';

// Initialize Firebase
if (firebase.apps.length === 0) firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const FieldValue = firebase.firestore.FieldValue;

// I don't know at this level how to handle an error.
// I do want to know where the error occurred so im logging it and throws it again.
function handleError(functionName, error) {
	console.log(`Error at Firestore/${functionName}`, error);
	throw error;
}

// Get the reference to a specific doc
function getDocRef(collection, docId) {
	return db.collection(collection).doc(docId);
}

// *--------------------------Public Functions--------------------------

function addDocToCollection(collection, doc, docId = undefined) {
	return db
		.collection(collection)
		.doc(docId)
		.set(doc)
		.catch((error) => handleError('addDocToCollection', error));
}

function getDoc(collection, docId) {
	return getDocRef(collection, docId)
		.get()
		.then((snapshot) => snapshot.data())
		.catch((error) => handleError('getDocSnapshot', error));
}

function getCollection(collection) {
	return db
		.collection(collection)
		.get()
		.then((querySnapshot) =>
			querySnapshot.docs.map((snapshot) => snapshot.data())
		)
		.catch((error) => handleError('getCollection', error));
}

function updateDocument(collection, docId, data) {
	return getDocRef(collection, docId)
		.update({ ...data, timestamp: FieldValue.serverTimestamp() })
		.catch((error) => handleError('updateADocument', error));
}

function incrementNumericField(collection, docId, field, incrementBy) {
	const data = {
		[field]: FieldValue.increment(incrementBy),
	};
	return updateDocument(collection, docId, data);
}

export default {
	addDocToCollection,
	getDoc,
	getCollection,
	updateDocument,
	incrementNumericField,
};
