import * as ImagePicker from 'expo-image-picker';
import { Button } from 'react-native';
import React, { useContext } from 'react';

import MediaHandler from '../Data/MediaHandler';
import { FinishedModalActContext, handleAct } from './ActsLogic';

// * ------------------------- SEND MEDIA (Video/Photo) ACT -------------------------
export const mediaTypes = Object.freeze({
	video: 1,
	libraryImage: 2,
	cameraImage: 3,
});

export async function sendMediaAct(mediaType) {
	const { status } = await (mediaType === mediaTypes.cameraImage
		? ImagePicker.requestCameraPermissionsAsync()
		: ImagePicker.requestCameraRollPermissionsAsync());
	if (status !== 'granted') {
		alert(
			'Sorry, we need camera roll permissions to take pictures of you!'
		);
	} else {
		const imageOptions = {
			mediaTypes:
				mediaType === mediaTypes.video
					? ImagePicker.MediaTypeOptions.Videos
					: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			quality: 1,
		};
		let result = await (mediaType === mediaTypes.cameraImage
			? ImagePicker.launchCameraAsync(imageOptions)
			: ImagePicker.launchImageLibraryAsync(imageOptions));

		if (!result.cancelled) {
			await MediaHandler.uploadImage(result.uri);
			return true;
		}
	}
	return false;
}

export function SendPhotoActModal() {
	const finished = useContext(FinishedModalActContext);
	const errorMessage =
		'Sorry, and error as occurred while trying to upload your photo';
	const successMessage = 'Photo Sent!';

	const getOnPress = (mediaType) => () =>
		finished(
			handleAct(sendMediaAct(mediaType), errorMessage, successMessage)
		);

	return (
		<>
			<Button
				onPress={getOnPress(mediaTypes.cameraImage)}
				title={'With Camera'}
			/>
			<Button
				onPress={getOnPress(mediaTypes.libraryImage)}
				title={'From Library'}
			/>
		</>
	);
}

export function sendVideoAct() {
	return handleAct(
		sendMediaAct(mediaTypes.video),
		'An error occurred while trying to send the video',
		'Video sent!'
	);
}
