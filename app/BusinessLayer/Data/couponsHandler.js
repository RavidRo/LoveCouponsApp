import Coupon from '../DataTypes/Coupon';
import { Firestore } from './Firebase/Firebase';

// TODO: Need to handle exceptions when calling Firestore functions
const collectionName = 'coupons';

/**
 * This class allows me to change the cache only using a setter
 * In the setter im notifying observer of the change
 */
class CouponsCache {
	constructor() {
		// Implements the singleton pattern - I want only one instance of this class
		if (!CouponsCache.instance) {
			// Caching
			this._coupons = null;
			// List of callbacks given by different observers which we should call when the coupons variable changes
			this.observers = [];

			CouponsCache.instance = this;
		}
		return CouponsCache.instance;
	}

	set coupons(value) {
		this._coupons = value;
		// Notify observers
		this.observers.forEach((callback) => callback(value));
	}
	get coupons() {
		return this._coupons;
	}

	addObserver(callback) {
		this.observers.push(callback);
	}

	get loaded() {
		return this._coupons != null;
	}
}

const cache = new CouponsCache();

/**
 * Saves a coupon at the database
 * @async
 * @param {Coupon} coupon the coupon to save
 * @throws Throws an error if coupon is already saved
 */
function saveCoupon(coupon) {
	if (!(coupon instanceof Coupon)) {
		throw new Error(
			`Coupons/saveCoupon expected instance of coupon but got:`,
			coupon
		);
	}
	coupon.save();

	// Add the new coupons to the list only if the list is loaded
	if (cache.loaded) {
		cache.coupons = [...cache.coupons, coupon];
	}
	const couponToSave = { ...coupon.toObject(), used: false };
	return Firestore.addDocToCollection(
		collectionName,
		couponToSave,
		couponToSave.id
	);
}

// * ---------------------------------------- public functions ----------------------------------------
/**
 * Gets all the coupons from the database
 * @async
 * @returns {Promise<Coupon[]>} Promise object representing an array of all the coupons
 */
async function getCoupons() {
	load();
	return cache.coupons;
}

/**
 * Creates a random coupon and saves it in the database.
 * @return The random created coupon.
 */
function createNewCoupon() {
	const coupon = Coupon.createNewCoupon();
	saveCoupon(coupon);
	return coupon;
}

/**
 * Used to listen for changes in the local coupons data
 * @param {(coupons: Coupon[]) => void} callback A call back which invoked when a changed occur in the local coupons data
 * @example
 * listenToChange((coupons) =>
 * 	coupons.foreach(coupon => console.log(coupon.text)))
 */
function listenToChange(callback) {
	cache.addObserver(callback);
}

async function load() {
	if (!cache.loaded) {
		const docs = await Firestore.getCollection(collectionName);
		cache.coupons = docs
			.filter((coupon) => !coupon.used)
			.map(Coupon.fromObject);
	}
}

async function useCoupon(couponId) {
	cache.coupons = cache.coupons.filter((coupon) => coupon.id !== couponId);
	return Firestore.updateDocument(collectionName, couponId, { used: true });
}

export default {
	getCoupons,
	listenToChange,
	createNewCoupon,
	load,
	useCoupon,
};
