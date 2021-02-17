import { useEffect, useState, useRef } from 'react';
import RaritiesHandler from '../BusinessLayer/Data/RaritiesHandler';
import StateHandler from '../BusinessLayer/Data/StateHandler';

// Here is the logic that needs to happen at the start of the app
export default function useInit() {
	const [loaded, setLoaded] = useState(false);
	const [loading, setLoading] = useState(false);
	const isMountedRef = useRef(null);

	const reload = () => {
		setLoading(true);
		Promise.all([RaritiesHandler.loadRarities(), StateHandler.loadState()])
			.then(() => {
				if (isMountedRef.current) {
					setLoaded(true);
				}
			})
			.catch((reason) => {
				console.log('Error at useInit', reason);
				alert("Couldn't load data, pls try again");
			})
			.finally(() => {
				if (isMountedRef.current) {
					setLoading(false);
				}
			});
	};

	// Set the rarities witch are set locally at the moment
	useEffect(() => {
		isMountedRef.current = true;
		reload();
		return () => (isMountedRef.current = false);
	}, []);

	return [loaded, loading, reload];
}
