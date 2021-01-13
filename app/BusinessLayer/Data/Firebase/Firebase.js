import './FirebaseTimerFix';
import * as firebase from 'firebase';

import firebaseConfig from '../../../config/firebaseConfig';

// Initialize Firebase
if (firebase.apps.length === 0) firebase.initializeApp(firebaseConfig);

export { default as Firestore } from './Firestore';
export { default as Storage } from './Storage';
