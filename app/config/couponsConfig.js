import colors from './colors';
import Rarity from '../BusinessLayer/DataTypes/Rarity';

const init = function () {
	const rarities = {
		legendary: new Rarity('legendary', colors.rarity.legendary, 0.05),
		epic: new Rarity('epic', colors.rarity.epic, 0.1),
		uncommon: new Rarity('uncommon', colors.rarity.uncommon, 0.2),
		rare: new Rarity('rare', colors.rarity.rare, 0.3),
		common: new Rarity('common', colors.rarity.common, 0.4),
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
