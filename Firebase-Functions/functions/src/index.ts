import * as functions from 'firebase-functions';

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
	functions.logger.info('Hello logs!', { structuredData: true });
	response.send('Hello from Firebase!');
});

export const forwardImageToWhatsapp = functions.firestore
	.document('images/{imageId}')
	.onCreate((snapshot) => {
		functions.logger.info('New Photo!', snapshot.data());
		const accountSid = 'AC7b93355c8b26d30d9359718254ef9b83';
		const authToken = ''; //! Insert here your Twilio auth token
		const client = require('twilio')(accountSid, authToken);

		return client.messages
			.create({
				mediaUrl: [snapshot.data().url],
				body: 'You got a new pick from your lover!',
				from: 'whatsapp:+14155238886',
				to: 'whatsapp:+972527599544',
			})
			.then((message) => console.log(message.sid))
			.done();
	});
