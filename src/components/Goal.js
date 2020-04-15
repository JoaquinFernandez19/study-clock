import React, { Component } from 'react';
import UIfx from 'uifx';
import nextAudio from './sounds/next.mp3';
const next = new UIfx(nextAudio, {
	volume: 0.7,
});

export class Goal extends Component {
	state = { goal: 1 };

	handleGoal = (e) => {
		this.props.onSubmit(e, this.state.goal);
	};
	increment = () => {
		if (this.state.goal < 12) {
			next.play();
			this.setState({ goal: this.state.goal + 1 });
		}
	};
	decrement = () => {
		if (this.state.goal > 1) {
			next.play();
			this.setState({ goal: this.state.goal - 1 });
		}
	};
	render() {
		return (
			<div className="goal animated fadeIn ">
				<h1 className="center aligned">What is you goal for today?</h1>
				<div className="hr-carousel">
					<i className="angle left icon huge" onClick={this.decrement}></i>
					<div className="number-box" value={this.state.goal}>
						{this.state.goal}
						<span style={{ fontSize: '16px' }}>hrs</span>
					</div>
					<i className="angle right icon huge" onClick={this.increment}></i>
				</div>
				<p className="checker-goal " onClick={this.handleGoal}>
					Start
				</p>
			</div>
		);
	}
}

export default Goal;
