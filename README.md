# LoveCoupons

Coupons Android Application for you're love one.
With this app your partner can earn points and coupon to redeem.

## Installation

The app was developed with expo:

-   [Download](https://nodejs.org/en/) and install npm to your machine.
-   Install expo-cli: `npm install --global expo-cli`
-   Install dependencies: `npm i`
-   Run the project: `expo start`

**In your android phone:**

-   Download the Expo app from the playstore.
-   Scan the QR code, which is opened in your terminal, with your new app.

## Set up:

-   You will need to create a firebase app with a blaze plan.
-   In the config folder create a 'firebaseConfig.js' file with your API information:

```export default {
	apiKey: '',
	authDomain: '',
	projectId: '',
	storageBucket: '',
	messagingSenderId: '',
	appId: '',
	measurementId: '',
};
```

-   Set up firebase functions and go to the 'Firebase-Functions' folder and deploy the project to your firebase-functions with the command `firebase deploy`

## Images:

![main screen](/PreviewImages/main_screen.jpg)
![earn points](/PreviewImages/earn_points.jpg)
![new coupon](/PreviewImages/new_coupon.jpg)
![coupons screen](/PreviewImages/coupons_screen.jpg)
