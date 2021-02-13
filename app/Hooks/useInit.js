import { useEffect, useState } from 'react';
import StateHandler from '../BusinessLayer/Data/StateHandler';
import couponsConfig from '../config/couponsConfig';

// Here is the logic that needs to happen at the start of the app
export default function useInit() {
	const [loaded, setLoaded] = useState(false);
	// Set the rarities witch are set locally at the moment
	useEffect(() => {
		couponsConfig.init();
		StateHandler.loadState().then(() => setLoaded(true));
	}, []);

	return loaded;
}
