import colors from '../../config/colors';
import coupons from '../Data/coupons';

// ? Maybe move this definition to couponsConfig
export const Rarity = Object.freeze({
	legendary: 1,
	epic: 2,
	rare: 3,
	uncommon: 4,
	common: 5,
});

export function createNewCoupon() {
	//TODO: Implement this
	throw Error('CouponObjec/createNewCoupon not yet implemented');
}

export class Coupon {
	constructor(rarity, text, saved = false) {
		this.rarity = rarity;
		this.text = text;

		// ?Maybe you can give each coupon an id instead of tracking if is saved or not
		// If the coupon is loaded from the database I don't want to be able to save a new copy of it(each one is unique)
		this.saved = saved;
	}

	get rarityColor() {
		return colors.rarity[this.rarity];
	}

	save() {
		// Makes sure you can't save the same coupon twice accidentally
		if (this.saved) {
			throw new Error(
				`Can't save the same coupon twice. Fields:`,
				this.toObject()
			);
		}
		this.saved = true;
		coupons.saveCoupon(this);
	}

	toObject() {
		return {
			rarity: this.rarity,
			text: this.text,
		};
	}
}
