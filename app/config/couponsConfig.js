import colors from './colors';
import Rarity from '../BusinessLayer/DataTypes/Rarity';

const init = function () {
	const rarities = {
		legendary: new Rarity('Legendary', colors.rarity.legendary, 0.05),
		epic: new Rarity('Epic', colors.rarity.epic, 0.1),
		uncommon: new Rarity('Uncommon', colors.rarity.uncommon, 0.2),
		rare: new Rarity('Rare', colors.rarity.rare, 0.3),
		common: new Rarity('Common', colors.rarity.common, 0.4),
	};

	rarities.legendary.addTexts(['יציאה לדייט בחוץ']);
	rarities.epic.addTexts(['ארוחת בוקר על ידי שף רביד']);
	rarities.uncommon.addTexts(['טיול אחד ברחבי העיר']);
	rarities.rare.addTexts(['רביד בוחר מה עושים ליום שלם']);
	rarities.common.addTexts([
		'אני לא מצאתי ולא אמצא מספיק מילים בשביל לספר לך כמה אני אוהב אותך ושאת מדהימה',
	]);
};

export default {
	init,
};
