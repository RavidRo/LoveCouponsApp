import React, { useRef } from 'react';
import {
	StyleSheet,
	TouchableHighlight,
	TouchableNativeFeedback,
	View,
} from 'react-native';
import PropTypes from 'prop-types';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Screen from '../components/Screen';
import ActsPicker from '../components/Acts/ActsPicker';
import CouponButton from '../components/CouponButton';
import colors from '../config/colors';
import AppText from '../components/AppText';

export default function MainScreen({ navigation }) {
	const counter = useRef(null);

	return (
		<Screen
			style={styles.container}
			backgroundImage={require('../assets/images/background.jpg')}
			backgroundImageOpacity={0.25}
			backgroundColor={colors.unknowngrey}
		>
			<TouchableNativeFeedback
				onPress={() => navigation.openDrawer()}
				style={{ backgroundColor: 'black' }}
			>
				<View style={styles.drawerIcon}>
					<AppText weight={'semiBold'}>Your Coupons</AppText>
					<MaterialCommunityIcons
						name={'chevron-right'}
						size={40}
						color={colors.medium}
						style={styles.icon}
					/>
				</View>
			</TouchableNativeFeedback>
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
		// backgroundColor: colors.unknowngrey,
		alignItems: 'center',
	},
	couponContainer: {
		marginTop: '40%',
		flex: 0.65,
	},
	pickerBtnContainer: {
		flex: 0.2,
		width: '100%',
		alignItems: 'center',
	},
	drawerIcon: {
		flexDirection: 'row-reverse',
		alignSelf: 'flex-start',
		marginRight: '12%',
		marginTop: '12%',
		alignItems: 'center',
		justifyContent: 'center',
		// padding: 2,
		paddingLeft: 15,
		backgroundColor: colors.pink_opacity,
		borderRadius: 20,
		overflow: 'hidden',
		// borderWidth: 0.5,
		// borderColor: colors.red,
	},
});

MainScreen.propTypes = {
	navigation: PropTypes.object,
};
