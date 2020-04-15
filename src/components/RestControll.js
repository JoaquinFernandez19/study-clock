import React, { Component } from 'react';
import UIfx from 'uifx';
import popAudio from './sounds/pop.mp3';

const pop = new UIfx(popAudio, {
	volume: 0.5,
});
export class RestControll extends Component {
	state = {
		activeRest: 'no-rest',
		minutes: 0,
		seconds: 0,
	};

	componentDidUpdate(prevProps) {
		if (this.state.seconds === 60) {
			this.setState({ minutes: this.state.minutes + 1, seconds: 0 });
		}
		if (this.props.resting !== prevProps.resting) {
			const restClock = document.querySelector('.rest-timer');
			if (this.props.resting) {
				this.interval = setInterval(() => {
					this.setState({ seconds: this.state.seconds + 1 });
				}, 1000);

				restClock.style.display = 'flex';
			} else {
				restClock.style.display = 'none';
				clearInterval(this.interval);
				this.setState({ seconds: 0, minutes: 0 });
			}
		}
	}

	handleRestSelection = (e) => {
		this.setState({ activeRest: e.target.classList[0] });
		pop.play();
		this.props.onRest(e.target.classList[0]);
	};

	render() {
		let minutes = `${this.state.minutes}`;
		let seconds = `${this.state.seconds}`;

		return (
			<div className="alert-me-styles">
				<h1>Rest every...</h1>
				<div className="rest-controllers">
					<div
						className={`15-min rest ${
							this.state.activeRest === '15-min' ? 'active-rest' : ''
						}`}
						onClick={this.handleRestSelection}>
						15
						<i className="clock outline icon"></i>
					</div>
					<div
						className={`30-min rest ${
							this.state.activeRest === '30-min' ? 'active-rest' : ''
						}`}
						onClick={this.handleRestSelection}>
						30
						<i className="clock outline icon"></i>
					</div>
					<div
						className={`1-hr rest ${
							this.state.activeRest === '1-hr' ? 'active-rest' : ''
						}`}
						onClick={this.handleRestSelection}>
						1<i className="clock outline icon"></i>
					</div>
					<div
						className={`no-rest rest ${
							this.state.activeRest === 'no-rest' ? 'active-rest' : ''
						} `}
						onClick={this.handleRestSelection}>
						no rest
					</div>
				</div>
				<div className="rest-timer">
					<p className="rest-clock">
						Resting {minutes.length >= 2 ? minutes : `0${minutes}`}:
						{seconds.length >= 2 ? seconds : `0${seconds}`}
					</p>
				</div>
			</div>
		);
	}
}

export default RestControll;
