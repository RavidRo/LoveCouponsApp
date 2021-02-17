import MessagesHandler from '../Data/MessagesHandler';
import { handleAct } from './ActsLogic';
import { SendPhotoActModal, SendVideoActModal } from './MediaActs';
import { SendCouponActModal, SendMessageActModal } from './MessageActs';

function sendHeartAct() {
	return handleAct(
		MessagesHandler.sendHeart().then(() => true),
		'An error occurred while trying to send a heart',
		'Heart sent!'
	);
}

function Act(label, points, act, modal = false, icon = undefined) {
	this.label = label;
	this.points = points;
	this.modal = modal;
	this.act = act;
	this.icon = icon;
}

export default [
	new Act('Coupon', 30, SendCouponActModal, true, 'gift'),
	new Act('Video', 15, SendVideoActModal, true, 'video-image'),
	new Act('Picture', 10, SendPhotoActModal, true, 'camera'),
	new Act('Message', 6, SendMessageActModal, true, 'cellphone-message'),
	new Act('❤', 3, sendHeartAct),
];
