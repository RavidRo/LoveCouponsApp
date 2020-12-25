// *The class represents a Rarity objects and handles instances
export default class Rarity {
	static id = 0;
	static instances = [];

	constructor(name, color, probability) {
		this.name = name;
		this.color = color;
		this.probability = probability;
		this.id = Rarity.id++;
		this.texts = [];
		Rarity.instances.push(this);
	}

	_isEmpty() {
		return this.texts === [];
	}
	addText(text) {
		this.texts.push(text);
	}
	addTexts(texts) {
		this.texts.concat(texts);
	}

	// returns a random text from the list of texts or undefined if empty
	getRandomText() {
		if (this._isEmpty()) return undefined;
		const randomNumberForText = Math.floor(
			Math.random() * this.texts.length
		);
		return this.texts[randomNumberForText];
	}

	// Returns the rarity instance with that id or undefined if not exists
	static getRarity(id) {
		this.instances.find((instance) => instance.id === id);
	}

	// Returns a random instance of existing rarity with texts, based on probability.
	// If not rarity with texts exists then returns undefined
	static getRandomRarity() {
		const chosenFrom = this.instances.filter(
			(rarity) => !rarity._isEmpty()
		);
		if (chosenFrom.length === 0) return undefined;

		// Sums up all the probabilities for the different instances
		const probabilitySum = chosenFrom.reduce(
			(acc, cur) => (acc += cur.probability)
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
