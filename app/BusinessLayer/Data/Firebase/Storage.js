import * as firebase from 'firebase';
import uuid from 'uuid';
import firebaseConfig from '../../../config/firebaseConfig';

// Initialize Firebase
if (firebase.apps.length === 0) firebase.initializeApp(firebaseConfig);

// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = firebase.storage();
// Create a storage reference from our storage service
const storageRef = storage.ref();

/**
 * Uploads an image to firebase storage
 * @param {string} uri The image url
 * @param {string} path The path in the storage to be saved at
 * @returns Two sized array: [ID, URL]
 */
async function uploadImage(uri, path) {
	// Why are we using XMLHttpRequest? See:
	// https://github.com/expo/expo/issues/2402#issuecomment-443726662
	const blob = await new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		xhr.onload = function () {
			resolve(xhr.response);
		};
		xhr.onerror = function (e) {
			console.error(e);
			reject(new TypeError('Network request failed'));
		};
		xhr.responseType = 'blob';
		xhr.open('GET', uri, true);
		xhr.send(null);
	});
	const imageId = uuid.v4();
	const ref = storageRef.child(`${path}/${imageId}`);
	const snapshot = await ref.put(blob);

	// We're done with the blob, close and release it
	blob.close();

	return [imageId, await snapshot.ref.getDownloadURL()];
}

export default {
	uploadImage,
};
