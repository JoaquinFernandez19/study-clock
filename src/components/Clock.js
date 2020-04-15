import React from 'react';
import RestControll from './RestControll';
import Goal from './Goal';
import GoalText from './GoalText';
//sounds
import UIfx from 'uifx';
import popAudio from './sounds/pop.mp3';
import popAudio2 from './sounds/pop2.mp3';
import resetAudio from './sounds/reset.mp3';
import zenAudio from './sounds/zen.mp3';
import zenRest from './sounds/zenRest.mp3';
const zen2 = new UIfx(zenRest, {
	volume: 1,
});
const pop = new UIfx(popAudio, {
	volume: 0.7,
});
const popPause = new UIfx(popAudio2, {
	volume: 0.7,
});
const reset = new UIfx(resetAudio, {
	volume: 0.5,
});
const zen = new UIfx(zenAudio, {
	volume: 0.3,
});

class Clock extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hours: 0,
			minutes: 0,
			seconds: 0,
			counting: false,
			rest: 'no-rest',
			selectedGoal: null,
			resting: false,
		};
	}
	setGoal = (e, goal) => {
		if (e.target.classList.contains('checker-goal')) {
			e.target.parentNode.classList.add('animated', 'fadeOut');
		}
		e.target.parentNode.addEventListener('animationend', (e) => {
			e.target.style.display = 'none';
			const timer = document.querySelector('.timer');
			const extraBtns = document.querySelector('.alert-me-styles');
			const goalTitle = document.querySelector('.goal-title');
			goalTitle.style.display = 'flex';
			extraBtns.style.display = 'flex';
			timer.style.display = 'grid';
			this.startCount();
			const goalDOM = document.querySelector('.goal');
			goalDOM.style.display = 'none';
			this.setState({ selectedGoal: goal });
		});
	};
	hideBtn = (e) => {
		zen.play();
		e.target.classList.add('animated', 'fadeOut');
		e.target.addEventListener('animationend', (e) => {
			e.target.style.display = 'none';
			const goal = document.querySelector('.goal');
			goal.style.display = 'flex';
		});
	};
	startCount = () => {
		this.setState({ resting: false });
		if (!this.state.counting) {
			pop.play();
			this.setState({ counting: true });
			this.myInterval = setInterval(() => {
				this.setState((prevState) => ({
					seconds: prevState.seconds + 1,
				}));
			}, 1000);
		}
	};
	stopTimer = (sound) => {
		if (this.state.counting) {
			this.setState({ counting: false });
			sound ? popPause.play() : zen2.play();
			clearInterval(this.myInterval);
		}
	};
	reset = () => {
		reset.play();
		clearInterval(this.myInterval);
		this.setState({
			hours: 0,
			minutes: 0,
			seconds: 0,
			counting: false,
			resting: false,
		});
	};

	//rest timer
	handleRest = (time) => {
		this.setState({ rest: time });
	};
	startRest = () => {
		this.setState({ seconds: 1, resting: true });
	};

	render() {
		let hours = `${this.state.hours}`;
		let minutes = `${this.state.minutes}`;
		let seconds = `${this.state.seconds}`;

		return (
			<div className="real-main-container">
				<div className="clock-form-start-btn" onClick={this.hideBtn}>
					Start studying
				</div>
				<Goal onSubmit={this.setGoal} />
				<RestControll onRest={this.handleRest} resting={this.state.resting} />
				<div className="timer">
					<p className="real-clock">
						{hours.length >= 2 ? hours : `0${hours}`}:
						{minutes.length >= 2 ? minutes : `0${minutes}`}:
						{seconds.length >= 2 ? seconds : `0${seconds}`}
					</p>

					<i
						className="pause icon mini"
						style={this.state.counting ? null : { color: 'red' }}
						onClick={this.stopTimer}></i>
					<i className="play icon mini" onClick={this.startCount}></i>
					<i className="close icon mini" onClick={this.reset}></i>
				</div>
				<GoalText goal={this.state.selectedGoal} />
			</div>
		);
	}
	componentDidUpdate() {
		//Actual clock
		let minutes = this.state.minutes;
		let seconds = this.state.seconds;
		if (seconds === 60) {
			this.setState({
				minutes: this.state.minutes + 1,
				seconds: 0,
			});
		}
		if (minutes === 60) {
			this.setState({
				hours: this.state.hours + 1,
				minutes: 0,
			});
		}
		//Rest checker
		if (this.state.rest !== 'no-rest' && this.state.counting) {
			if (
				this.state.rest === '15-min' &&
				(this.state.minutes === 15 ||
					this.state.minutes === 30 ||
					this.state.minutes === 45) &&
				this.state.seconds === 0
			) {
				this.startRest();
				this.stopTimer(false);
			}
			if (
				this.state.rest === '30-min' &&
				(this.state.minutes === 30 || this.state.hours > 0) &&
				this.state.seconds === 0
			) {
				this.startRest();
				this.stopTimer(false);
			}
			if (
				this.state.rest === '1-hr' &&
				this.state.minutes === 0 &&
				this.state.hours > 0 &&
				this.state.seconds === 0
			) {
				this.startRest();
				this.stopTimer(false);
			}
		}
		//Goal checker
		if (this.state.hours == this.state.selectedGoal) {
			alert('YOU FINISH!!! GO PLAY SOME VIDEO GAMES');
			this.reset();
		}
	}
}

export default Clock;
