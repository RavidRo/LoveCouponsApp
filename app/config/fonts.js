// const openSansBold = require('../assets/fonts/OpenSansHebrew/OpenSansHebrew-Bold.ttf');
// const openSansExtraBold = require('../assets/fonts/OpenSansHebrew/OpenSansHebrew-ExtraBold.ttf');
// const openSansLight = require('../assets/fonts/OpenSansHebrew/OpenSansHebrew-Light.ttf');
// const openSansRegular = require('../assets/fonts/OpenSansHebrew/OpenSansHebrew-Regular.ttf');

// const arimoBold = require('../assets/fonts/Arimo/Arimo-Bold.ttf');
// const arimoRegular = require('../assets/fonts/Arimo/Arimo-Regular.ttf');

const rubikBlack = require('../assets/fonts/Rubik/Rubik-Black.ttf');
const rubikExtraBold = require('../assets/fonts/Rubik/Rubik-ExtraBold.ttf');
const rubikBold = require('../assets/fonts/Rubik/Rubik-Bold.ttf');
const rubikSemiBold = require('../assets/fonts/Rubik/Rubik-SemiBold.ttf');
const rubikMedium = require('../assets/fonts/Rubik/Rubik-Medium.ttf');
const rubikRegular = require('../assets/fonts/Rubik/Rubik-Regular.ttf');
const rubikLight = require('../assets/fonts/Rubik/Rubik-Light.ttf');

const RUBIK = 'Rubik';
const getRubikFamily = (weight) =>
	weight === 'black ' || weight === '900'
		? 'Rubik-Black'
		: weight === 'extraBold ' || weight === '800'
		? 'Rubik-ExtraBold'
		: weight === 'bold' || weight === '700'
		? 'Rubik-Bold'
		: weight === 'semiBold' || weight === '600'
		? 'Rubik-SemiBold'
		: weight === 'medium' || weight === '500'
		? 'Rubik-Medium'
		: weight === 'light ' || weight === '300'
		? 'Rubik-Light'
		: 'Rubik-Regular';

export default {
	getFontFamily: (family, weight) =>
		family === RUBIK ? getRubikFamily(weight) : null,

	RUBIK,

	// The dictionary to be loaded at the start
	fontsDict: {
		'Rubik-Black': rubikBlack,
		'Rubik-ExtraBold': rubikExtraBold,
		'Rubik-Bold': rubikBold,
		'Rubik-SemiBold': rubikSemiBold,
		'Rubik-Medium': rubikMedium,
		'Rubik-Regular': rubikRegular,
		'Rubik-Light': rubikLight,
	},
};
