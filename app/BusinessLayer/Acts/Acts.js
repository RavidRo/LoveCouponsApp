import MessagesHandler from '../Data/MessagesHandler';
import { handleAct } from './ActsLogic';
import { SendPhotoActModal, sendVideoAct } from './MediaActs';
import { SendCouponActModal, SendMessageActModal } from './MessageActs';

function sendHeartAct() {
	return handleAct(
		MessagesHandler.sendHeart().then(() => true),
		'An error occurred while trying to send a heart',
		'Heart sent!'
	);
}

function Act(label, points, act, modal = false) {
	this.label = label;
	this.points = points;
	this.modal = modal;
	this.act = act;
}

export default [
	new Act('Write a coupon', 30, SendCouponActModal, true),
	new Act('Send a loving video', 15, sendVideoAct),
	new Act('Take a picture ;)', 10, SendPhotoActModal, true),
	new Act('Send a cute message!', 5, SendMessageActModal, true),
	new Act('Send a big heart ❤', 2, sendHeartAct),
];
