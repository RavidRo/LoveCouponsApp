import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

import Screen from '../components/Screen';
import ActsPicker from '../components/Acts/ActsPicker';
import CouponButton from '../components/CouponButton';
import colors from '../config/colors';
import DrawerButton from '../components/DrawerButton';

export default function MainScreen({ navigation }) {
	const counter = useRef(null);

	return (
		<Screen
			style={styles.container}
			backgroundImage={require('../assets/images/background.jpg')}
			backgroundImageOpacity={0.25}
			backgroundColor={colors.unknowngrey}
		>
			<DrawerButton onPress={() => navigation.openDrawer()} />
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
		alignItems: 'center',
	},
	couponContainer: {
		marginTop: '32%',
		flex: 0.65,
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
