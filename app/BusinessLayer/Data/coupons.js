import { Coupon } from '../DataTypes/CouponObject';
import Firestore from './Firebase/Firestore';

// TODO: Need to handle exceptions when calling Firestore functions

const collectionName = 'coupons';

// Caching
let coupons = null;

async function getCoupons() {
	if (!coupons) {
		coupons = await Firestore.getCollection(collectionName).then((docs) =>
			docs.map(
				(couponDoc) =>
					new Coupon(couponDoc.rarity, couponDoc.text, true)
			)
		);
	}
	return coupons;
}

function saveCoupon(coupon) {
	if (!(coupon instanceof Coupon)) {
		throw new Error(
			'At coupons/saveCoupon coupon is not of instance coupon, instead received:',
			coupon
		);
	}
	// Add the new coupons to the list only if the list is loaded
	coupons?.push(coupon);
	return Firestore.addDocToCollection(collectionName, coupon.toObject());
}

export default {
	getCoupons,
	saveCoupon,
};
