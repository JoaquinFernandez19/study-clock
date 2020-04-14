import React from 'react';
import AlertMe from './AlertMe';
//sounds
import UIfx from 'uifx';
import popAudio from './sounds/pop.mp3';
import popAudio2 from './sounds/pop2.mp3';
import resetAudio from './sounds/reset.mp3';
import zenAudio from './sounds/zen.mp3';

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
			rest: null,
		};
	}

	hideBtn = (e) => {
		zen.play();
		e.target.classList.add('animated', 'fadeOut');
		e.target.addEventListener('animationend', (e) => {
			e.target.style.display = 'none';
			const timer = document.querySelector('.timer');
			const extraBtns = document.querySelector('.alert-me-styles');

			extraBtns.style.display = 'flex';
			timer.style.display = 'grid';
			this.startCount();
		});
	};

	startCount = () => {
		this.setState({ reseted: false });
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
	stopTimer = () => {
		if (this.state.counting) {
			popPause.play();
			clearInterval(this.myInterval);
			this.setState({ counting: false });
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
		});
	};

	//rest timer
	handleRest = (time) => {
		this.setState({ rest: time });
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
				<AlertMe onRest={this.handleRest} />
				<div className="timer">
					<p>
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
			</div>
		);
	}
	componentDidUpdate() {
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
		if (this.state.rest !== 'no-rest') {
			if (
				this.state.rest === '15-min' &&
				(this.state.minutes === 15 ||
					this.state.minutes === 30 ||
					this.state.minutes === 45) &&
				this.state.seconds === 0
			) {
				alert('take a rest ');
				zen.play();
			}
			if (
				this.state.rest === '30-min' &&
				(this.state.minutes === 30 || this.state.hours > 0) &&
				this.state.seconds === 0
			) {
				alert('take a rest 30min');
				zen.play();
			}
		}
	}
}

export default Clock;
