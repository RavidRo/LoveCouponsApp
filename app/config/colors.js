import { Rarity } from '../BusinessLayer/DataTypes/CouponObject';

export default {
	white: '#fff',
	light: '#eee',
	medium: '#888',
	black: '#000',
	red: '#f0265d',
	rarity: {
		[Rarity.legendary]: 'yellow',
		[Rarity.epic]: 'purple',
		[Rarity.rare]: 'blue',
		[Rarity.uncommon]: 'green',
		[Rarity.common]: '#ccc',
		default: '#000',
	},
};
