import * as ImagePicker from 'expo-image-picker';

import MediaHandler from './Data/MediaHandler';

async function takeAPictureAct() {
	const { status } = await ImagePicker.requestCameraPermissionsAsync();
	if (status !== 'granted') {
		alert(
			'Sorry, we need camera roll permissions to take pictures of you!'
		);
	} else {
		let result = await ImagePicker.launchCameraAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			quality: 1,
		});

		if (!result.cancelled) {
			MediaHandler.uploadImage(result.uri)
				.then(() => alert('Photo sent!'))
				.catch((reason) => {
					console.error('ERROR at Acts/takePictureAct: ', reason);
					alert(
						'Sorry, and error as occurred while trying to upload your photo'
					);
				});
			return true;
		}
	}
	return false;
}

export default [
	{
		label: 'You',
		points: 5,
		act: async function act() {
			return true;
		},
	},
	{
		label: 'Take a picture ;)',
		points: 20,
		act: takeAPictureAct,
	},
];
