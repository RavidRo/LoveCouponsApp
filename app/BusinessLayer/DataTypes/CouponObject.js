import colors from '../../config/colors';

export const Rarity = Object.freeze({
	legendary: 1,
	epic: 2,
	rare: 3,
	uncommon: 4,
	common: 5,
});

// Create an immutable object which defines rarities values to a color.
// For example, colorRarity[Rarity.rare] returns colors.rarity.rare
const colorByRarity = Object.freeze(
	Object.fromEntries(
		Object.entries(Rarity).map(([key, value]) => [
			value,
			colors.rarity[key] ? colors.rarity[key] : colors.rarity.default,
		])
	)
);

export class Coupon {
	constructor(rarity, text) {
		this.rarity = rarity;
		this.text = text;
	}

	get rarityColor() {
		return colorByRarity[this.rarity];
	}
}
