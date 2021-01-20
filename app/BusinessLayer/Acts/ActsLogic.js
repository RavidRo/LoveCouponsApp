import React from 'react';

//! I can't put this function in the main Acts.js file because a cyclic dependencies will occur

/**
 * Takes an sync function, alert the user and logs on an error.
 * @param {Promise<any>} act the act main async function that needs handling. If act returns false than nothing happens.
 * @param {string} errorMessage
 * @param {string} successMessage
 * @return {Promise<boolean>} true or false depends if the act was successful
 */
export function handleAct(act, errorMessage, successMessage) {
	return act
		.then((result) => {
			if (result) {
				alert(successMessage);
			}
			return result;
		})
		.catch((reason) => {
			console.error(reason);
			alert(errorMessage);
			return false;
		});
}

export const FinishedModalActContext = React.createContext();
