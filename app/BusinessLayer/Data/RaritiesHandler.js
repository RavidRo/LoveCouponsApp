import Rarity from '../DataTypes/Rarity';
import { Firestore } from './Firebase/Firebase';

const raritiesCollectionName = 'rarities';
const couponsCollectionName = 'couponsBank';

async function loadRarities() {
	const collection = await Firestore.getCollection(raritiesCollectionName);
	const rarities = collection.map(
		(document) =>
			new Rarity(
				document.name,
				document.color,
				document.probability,
				document.id
			)
	);
	const texts = await Firestore.getCollection(couponsCollectionName);

	texts.forEach(({ rarityId, text }) =>
		rarities.find((rarity) => rarity.id === rarityId)?.addText(text)
	);
}

export default { loadRarities };
