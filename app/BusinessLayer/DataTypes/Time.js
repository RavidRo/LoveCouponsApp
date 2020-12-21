export default class Time {
	constructor(time) {
		this.timeLeft = time;
		this.setFields(time);
	}

	setFields(timeLeft) {
		this.hours = this.getHours(timeLeft);
		this.minutes = this.getMinutes(timeLeft);
		this.seconds = this.getSeconds(timeLeft);
	}

	advanceTime() {
		this.timeLeft = Math.max(this.timeLeft - 1, 0);
		this.setFields(this.timeLeft);
	}

	getHours(timeLeft) {
		if (timeLeft <= 0) return 0;
		return Math.floor(timeLeft / (60 * 60));
	}
	getMinutes(timeLeft) {
		if (timeLeft <= 0) return 0;
		timeLeft -= this.getHours(timeLeft) * (60 * 60);
		return Math.floor(timeLeft / 60);
	}
	getSeconds(timeLeft) {
		if (timeLeft <= 0) return 0;
		const hours = this.getHours(timeLeft);
		const minutes = this.getMinutes(timeLeft);
		timeLeft -= hours * (60 * 60) + minutes * 60;
		return timeLeft;
	}

	get finished() {
		return this.seconds === 0 && this.minutes === 0 && this.hours === 0;
	}
}
