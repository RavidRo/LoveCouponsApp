/**
 * The class represents a Rarity object and handles his instances.
 * @class
 * @constructor
 * @public
 */
export default class Rarity {
	static id = 0;
	/**
	 * A list of all the instances of Rarity
	 * @static
	 * @type {Rarity[]}
	 */
	static instances = [];

	/**
	 * @constructor
	 * @param {String} name The name of the created rarity.
	 * @param {String} color A string representing a color. e.g. "red" or "#f12".
	 * @param {Number} probability A float representing the probability to get a coupon of this rarity when getting a new coupon.
	 */
	constructor(name, color, probability) {
		this.name = name;
		this.color = color;
		this.probability = probability;
		this.id = Rarity.id++;
		/**
		 * The list of texts that a coupon of this rarity can have.
		 * @private
		 * @type {String[]}
=		 */
		this.texts = [];
		Rarity.instances.push(this);
	}

	/** @returns true if there are now texts for coupons in this rarity */
	isEmpty() {
		return this.texts === [];
	}

	/** @param {String} text Add a text that will have a chance to be added to a new coupon of this rarity */
	addText(text) {
		this.texts.push(text);
	}

	/** @param {String[]} texts Add texts that will have a chance to be added to a new coupon of this rarity */
	addTexts(texts) {
		texts.forEach(this.addText);
	}

	/** @returns {String} Random text from the list of texts or `undefined` if empty */
	getRandomText() {
		if (this.isEmpty()) return undefined;
		const randomNumberForText = Math.floor(
			Math.random() * this.texts.length
		);
		return this.texts[randomNumberForText];
	}

	/**
	 * Returns a rarity for a given id
	 * @static
	 * @param {Number} id An id of a rarity object
	 * @returns The rarity instance with the given id or `undefined` if no such rarity exists
	 * */
	static getRarity(id) {
		this.instances.find((instance) => instance.id === id);
	}

	/**
	 * Returns a random rarity from all the created rarities.
	 *
	 * The bigger the probability of a rarity the chance of it returning increases.
	 * But if the rarity doesn't have any texts it never returns
	 *
	 * @static
	 * @returns {Rarity} The random rarity. If no suitable rarity exists then `undefined` is returned.
	 */
	static getRandomRarity() {
		const chosenFrom = this.instances.filter((rarity) => !rarity.isEmpty());
		if (chosenFrom.length === 0) return undefined;

		// Sums up all the probabilities for the different instances
		const probabilitySum = chosenFrom.reduce(
			(acc, cur) => (acc += cur.probability),
			0
		);

		// Randomizing a number and choose a rarity according to that number
		let randomized = Math.random() * probabilitySum;
		for (const rarity of chosenFrom) {
			if (randomized <= rarity.probability) return rarity;
			randomized -= rarity.probability;
		}

		throw Error(
			'Rarity/getRandomRarity() Something went wrong, should not get here :('
		);
	}
}
