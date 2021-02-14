import Rarity from './Rarity';
import { v4 as uuidv4 } from 'uuid';

export default class Coupon {
	constructor(rarity, text, saved = false, id = uuidv4()) {
		this.rarity = rarity;
		if (!rarity) {
			throw new Error(
				`Coupon/constructor: Rarity was ${rarity}, Can't create a coupon without a rarity. `
			);
		}
		this.text = text;

		// ?Maybe you can give each coupon an id instead of tracking if is saved or not. Firebase will then handle this shit.
		// If the coupon is loaded from the database I don't want to be able to save a new copy of it(each one is unique)
		this.saved = saved;
		this.id = id;
	}

	// Creates a random new coupon!
	static createNewCoupon() {
		const chosenRarity = Rarity.getRandomRarity();
		if (!chosenRarity)
			throw Error(`Coupon/createNewCoupon() no coupons left`);
		// Choosing a random text for the coupon from the list of possibilities
		const text = chosenRarity.getRandomText();
		if (!text)
			throw Error(
				`Coupon/createNewCoupon() something went wrong, there should be a text available but none was found`
			);

		return new Coupon(chosenRarity, text);
	}

	get rarityColor() {
		return this.rarity.color;
	}

	// This should be called when saving this instance to the database
	save() {
		if (this.saved) {
			throw new Error(
				`Can't save the same coupon twice. Fields:`,
				this.toObject()
			);
		}
		this.saved = true;
	}

	// This is the object which will be saved in the database
	toObject() {
		return {
			rarityId: this.rarity.id,
			text: this.text,
			id: this.id,
		};
	}

	// The reverse function for "toObject"
	static fromObject(couponObject, saved = true) {
		const rarity = Rarity.getRarity(couponObject.rarityId);
		return new Coupon(rarity, couponObject.text, saved, couponObject.id);
	}
}
