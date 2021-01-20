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
		const emailAddress = 'loveucoupons@gmail.com';
		const emailPassword = 'LoveUCoupons9';
		const emailToSendTo = 'romravid@gmail.com';

		functions.logger.log('A new message!', snapshot.data());
		const nodemailer = require('nodemailer');

		var mail = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: emailAddress,
				pass: emailPassword,
			},
		});

		var mailOptions = {
			from: emailAddress,
			to: emailToSendTo,
			subject: 'A message from your lover ❤',
			text: 'I have a picture for you ;)',
			html: `<a href='${snapshot.data().url}'>Click Me!</a>`,
		};

		return mail.sendMail(mailOptions, function (error: any, info: any) {
			if (error) {
				functions.logger.error(error);
			} else {
				functions.logger.info('Email sent: ', info.response);
			}
		});
	});
