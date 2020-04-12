import React from 'react';

class Clock extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hours: 0, minutes: 0, seconds: 0, counting: false };
		this.baseState = this.state;
	}

	hideBtn = (e) => {
		e.target.classList.add('animated', 'fadeOut');
		e.target.addEventListener('animationend', (e) => {
			e.target.style.display = 'none';
			const timer = document.querySelector('.timer');
			timer.style.display = 'grid';
			this.startCount();
		});
	};

	startCount = () => {
		if (!this.state.counting) {
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
			clearInterval(this.myInterval);
			this.setState({ counting: false });
		}
	};
	reset = () => {
		this.setState(this.baseState);
		this.setState({
			counting: true,
		});
	};
	render() {
		let hours = `${this.state.hours}`;
		let minutes = `${this.state.minutes}`;
		let seconds = `${this.state.seconds}`;

		return (
			<div>
				<div className="clock-form-start-btn" onClick={this.hideBtn}>
					Start studying
				</div>
				<div className="timer">
					<p>
						{hours.length >= 2 ? hours : `0${hours}`}:
						{minutes.length >= 2 ? minutes : `0${minutes}`}:
						{seconds.length >= 2 ? seconds : `0${seconds}`}
					</p>

					<i className="pause icon mini" onClick={this.stopTimer}></i>
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
	}
}

export default Clock;
