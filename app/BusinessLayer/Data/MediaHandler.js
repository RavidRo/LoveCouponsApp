import { Storage, Firestore } from './Firebase/Firebase';

const imagesStoragePath = 'images';
const videosStoragePath = 'videos';
const imagesCollectionName = imagesStoragePath;
const videosCollectionName = videosStoragePath;

/**
 * Upload an image to the database.
 * At the backend the image is sent to the Lover.
 * @param {string} uri The image URL
 */
async function uploadImage(uri) {
	// Uploading the image to Firebase Storage
	const [imageID, URL] = await Storage.uploadImage(uri, imagesStoragePath);
	// Uploading to Firestore the image details: URL, id and maybe who uploaded it and more in the future
	return Firestore.addDocToCollection(
		imagesCollectionName,
		{ url: URL },
		imageID
	);
}

/**
 *  Upload a video to the database.
 *  At the backend the image is sent to the Lover.
 * @param {string} uri The video URL
 * NOT YET IMPLEMENTED
 */
async function uploadVideo(uri) {
	// Uploading the image to Firebase Storage
	const [videoId, URL] = await Storage.uploadImage(uri, videosStoragePath);
	// Uploading to Firestore the image details: URL, id and maybe who uploaded it and more in the future
	return Firestore.addDocToCollection(
		videosCollectionName,
		{ url: URL },
		videoId
	);
}

export default {
	uploadImage,
	uploadVideo,
};
