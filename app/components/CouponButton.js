import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';

import CouponsHandler from '../BusinessLayer/Data/CouponsHandler';
import StateHandler from '../BusinessLayer/Data/StateHandler';
import settings from '../config/settings';
import CouponCounter from './CouponCounter';
import DisplayCoupon from './DisplayCoupon';
import ActModal from './Acts/ActModal';
import HeartButton from './HeartButton';
import AppText from './AppText';
import colors from '../config/colors';

export default class CouponButton extends Component {
	constructor(props) {
		super(props);
		this.state = { newCoupon: null, modal: false };
		this.counter_ref = React.createRef();
	}

	addPoints(pointsToAdd) {
		this.counter_ref.current.addPoints(pointsToAdd);
		StateHandler.addPoints(pointsToAdd);
	}

	getCoupon() {
		if (this.counter_ref.current.isFull()) {
			this.setState({ modal: true });
			const newCoupon = CouponsHandler.createNewCoupon(); //Creating the new coupon
			this.setState({ newCoupon });
			this.counter_ref.current.usePoints(); //Remove the points from the points counter
			StateHandler.removePoints(settings.pointsForCoupon); //Save the new points value in the database
		}
	}

	render() {
		return (
			<View style={this.props.style}>
				<TouchableOpacity
					onPress={
						this.props.isInternetReachable
							? () => this.getCoupon()
							: undefined
					}
				>
					<CouponCounter ref={this.counter_ref} />
				</TouchableOpacity>
				{this.state.modal && (
					<ActModal animationType={'fade'} transparent>
						{this.state.newCoupon && (
							<>
								<AppText weight={'bold'} style={styles.header}>
									{'Your new coupon!'}
								</AppText>
								<AppText
									weight={'bold'}
									style={{
										...styles.header,
										color: this.state.newCoupon.rarity
											.color,
									}}
								>
									{this.state.newCoupon.rarity.name}
								</AppText>
								<DisplayCoupon
									coupon={this.state.newCoupon}
									textStyle={styles.couponText}
								/>
							</>
						)}
						<HeartButton
							onPress={() =>
								this.setState({ newCoupon: null, modal: false })
							}
							text={'YAY!'}
						/>
					</ActModal>
				)}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	couponText: { left: '35%', width: '62%' },
	header: {
		color: colors.pink,
		fontSize: 30,
		textShadowColor: colors.medium,
		textShadowOffset: { width: 2, height: 2 },
		textShadowRadius: 5,
	},
});

CouponButton.propTypes = {
	style: PropTypes.object,
	isInternetReachable: PropTypes.bool.isRequired,
};
