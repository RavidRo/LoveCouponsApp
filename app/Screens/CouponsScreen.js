import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';

import AppText from '../components/AppText';
import Screen from '../components/Screen';
import DisplayCoupon from '../components/DisplayCoupon';
import CouponsHandler from '../BusinessLayer/Data/CouponsHandler';
import colors from '../config/colors';
import ActModal from '../components/Acts/ActModal';
import HeartButton from '../components/HeartButton';
import { useNetInfo } from '@react-native-community/netinfo';

export default function CouponsScreen() {
	const [displayingCoupons, setDisplayingCoupons] = useState([]);
	const [couponUsing, setCouponUsing] = useState(null);
	const [refreshing, setRefreshing] = useState(true);
	const { isInternetReachable } = useNetInfo();
	// TODO: 1) Handle errors correctly 2) Add some kind of loading indicator 3) Don't put the initial loading here
	useEffect(() => {
		CouponsHandler.listenToChange(setDisplayingCoupons);
		CouponsHandler.load().finally(() => setRefreshing(false));
	}, []);

	return (
		<>
			<Screen style={styles.container}>
				<AppText weight={'medium'}>Your Coupons</AppText>
				<FlatList
					data={displayingCoupons}
					renderItem={({ item }) => (
						<TouchableOpacity onPress={() => setCouponUsing(item)}>
							<DisplayCoupon
								coupon={item}
								style={styles.coupon}
								textStyle={styles.couponText}
							/>
						</TouchableOpacity>
					)}
					keyExtractor={(_, index) => index.toString()}
					onRefresh={() => {
						setRefreshing(true);
						CouponsHandler.load().finally(() =>
							setRefreshing(false)
						);
					}}
					refreshing={refreshing}
				/>
			</Screen>
			{couponUsing && (
				<ActModal>
					<AppText weight={'bold'} style={styles.header}>
						{'You want to redeem your coupon?'}
					</AppText>
					<DisplayCoupon
						coupon={couponUsing}
						textStyle={styles.couponModalText}
					/>
					<View style={styles.buttonsContainer}>
						<HeartButton
							onPress={() => setCouponUsing(null)}
							text={'NAY!'}
							color={colors.blue}
						/>

						<HeartButton
							onPress={() => {
								if (isInternetReachable) {
									setCouponUsing(null);
									CouponsHandler.useCoupon(couponUsing.id);
								} else {
									alert('No internet connection...');
								}
							}}
							text={'YAY!'}
						/>
					</View>
				</ActModal>
			)}
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.cyan,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	coupon: {
		marginLeft: '-17.5%',
		marginVertical: '-10%',
	},
	couponText: {
		left: '38%',
		width: '67%',
	},
	couponModalText: {
		left: '35%',
		width: '62%',
	},
	header: {
		color: colors.pink,
		fontSize: 30,
		textShadowColor: colors.medium,
		textShadowOffset: { width: 2, height: 2 },
		textShadowRadius: 5,
		textAlign: 'center',
	},
	buttonsContainer: {
		flexDirection: 'row-reverse',
	},
});
