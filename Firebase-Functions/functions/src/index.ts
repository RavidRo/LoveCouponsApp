import * as functions from 'firebase-functions';

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
//

const emailAddress = 'loveucoupons@gmail.com';
const emailPassword = 'LoveUCoupons9';
const emailToSendTo = 'romravid@gmail.com';
const nodemailer = require('nodemailer');

const mailOptions = {
	from: emailAddress,
	to: emailToSendTo,
};

const transportOptions = {
	service: 'gmail',
	auth: {
		user: emailAddress,
		pass: emailPassword,
	},
};

function sendMail(mailOptions: object) {
	const mail = nodemailer.createTransport(transportOptions);
	return mail.sendMail(mailOptions, function (error: any, info: any) {
		if (error) {
			functions.logger.error(error);
		} else {
			functions.logger.info('Email sent: ', info.response);
		}
	});
}

// export const helloWorld = functions.https.onRequest((request, response) => {
// 	functions.logger.info('Hello logs!', { structuredData: true });
// 	response.send('Hello from Firebase!');
// });

export const redeemCoupon = functions.firestore
	.document('coupons/{couponId}')
	.onUpdate((change) => {
		if (!change.before.data().used && change.after.data().used) {
			const redeemMailOptions = {
				...mailOptions,
				subject: 'A coupon has been redeemed',
				text: change.after.data().text,
			};

			return sendMail(redeemMailOptions);
		}
	});

export const forwardHeartToEmail = functions.firestore
	.document('hearts/hearts')
	.onUpdate((change) => {
		if (change.before.data().count <= change.after.data().count) {
			const redeemMailOptions = {
				...mailOptions,
				subject: 'A message from your lover ❤',
				text: 'Your lover sent you a big big heart <3',
			};

			return sendMail(redeemMailOptions);
		}
	});

export const forwardCouponToEmail = functions.firestore
	.document('sentCoupons/{couponId}')
	.onCreate((snapshot) => {
		const redeemMailOptions = {
			...mailOptions,
			subject: 'A coupon from your lover ❤ :o',
			text: snapshot.data().description,
		};

		return sendMail(redeemMailOptions);
	});

export const forwardMessageToEmail = functions.firestore
	.document('messages/{messageId}')
	.onCreate((snapshot) => {
		const redeemMailOptions = {
			...mailOptions,
			subject: 'A message from your lover ❤ :o',
			text: snapshot.data().description,
		};

		return sendMail(redeemMailOptions);
	});

export const forwardImageToEmail = functions.firestore
	.document('images/{imageId}')
	.onCreate((snapshot) => {
		functions.logger.log('A new message!', snapshot.data());

		const imageMailOptions = {
			...mailOptions,
			subject: 'A message from your lover ❤',
			text: 'I have a picture for you ;)',
			html: `<a href='${snapshot.data().url}'>Click Me!</a>`,
		};

		return sendMail(imageMailOptions);
	});

export const forwardVideoToEmail = functions.firestore
	.document('videos/{imageId}')
	.onCreate((snapshot) => {
		functions.logger.log('A new message!', snapshot.data());

		const imageMailOptions = {
			...mailOptions,
			subject: 'A message from your lover ❤',
			text: 'I have a video for you ;)',
			html: `<a href='${snapshot.data().url}'>Click Me!</a>`,
		};

		return sendMail(imageMailOptions);
	});
