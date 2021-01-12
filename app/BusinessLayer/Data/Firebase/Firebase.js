import './FirebaseTimerFix';
import * as firebase from 'firebase';
import * as Firestore from './Firestore';
import * as Storage from './Storage';

import firebaseConfig from '../../../config/firebaseConfig';

// Initialize Firebase
if (firebase.apps.length === 0) firebase.initializeApp(firebaseConfig);

export default {
	Firestore,
	Storage,
};
