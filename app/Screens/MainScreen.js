import React, { useRef } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

import Screen from '../components/Screen';
import ActsPicker from '../components/Acts/ActsPicker';
import colors from '../config/colors';
import CouponButton from '../components/CouponButton';

export default function MainScreen({ navigation }) {
	const counter = useRef(null);

	return (
		<Screen style={styles.container}>
			<Button title="=>" onPress={() => navigation.openDrawer()} />
			<CouponButton ref={counter} style={styles.couponContainer} />
			<View style={styles.pickerBtnContainer}>
				<ActsPicker
					onSelect={(points) => {
						if (points > 0) {
							counter.current.addPoints(points);
						}
					}}
				/>
			</View>
		</Screen>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.unknowngrey,
		alignItems: 'center',
	},
	couponContainer: {
		marginTop: '50%',
		flex: 0.6,
	},
	pickerBtnContainer: {
		flex: 0.2,
		width: '100%',
		alignItems: 'center',
	},
});

MainScreen.propTypes = {
	navigation: PropTypes.object,
};
