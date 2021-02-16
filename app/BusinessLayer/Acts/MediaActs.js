import * as ImagePicker from 'expo-image-picker';
import { Button, StyleSheet } from 'react-native';
import React, { useContext } from 'react';

import MediaHandler from '../Data/MediaHandler';
import { FinishedModalActContext, handleAct } from './ActsLogic';
import { useEffect } from 'react';
import AppButton from '../../components/AppButton';
import colors from '../../config/colors';

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
			if (mediaType === mediaTypes.video) {
				await MediaHandler.uploadVideo(result.uri);
			} else {
				await MediaHandler.uploadImage(result.uri);
			}
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
			<AppButton
				onPress={getOnPress(mediaTypes.cameraImage)}
				title={'With Camera'}
				style={styles.button}
				textStyle={styles.buttonText}
			/>
			<AppButton
				onPress={getOnPress(mediaTypes.libraryImage)}
				title={'From Library'}
				style={styles.button}
				textStyle={styles.buttonText}
			/>
		</>
	);
}
const styles = StyleSheet.create({
	button: {
		backgroundColor: colors.cyan,
		marginVertical: 10,
	},
	buttonText: {
		fontSize: 25,
		padding: 5,
		color: colors.dark,
	},
});

export function SendVideoActModal() {
	const finished = useContext(FinishedModalActContext);
	useEffect(
		() =>
			finished(
				handleAct(
					sendMediaAct(mediaTypes.video),
					'An error occurred while trying to send the video',
					'Video sent!'
				)
			),
		[]
	);

	return <></>;
}
