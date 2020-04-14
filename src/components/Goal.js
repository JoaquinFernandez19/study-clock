import React, { Component } from 'react';

export class Goal extends Component {
	state = { goal: null };

	handleGoal = (e) => {
		this.setState({ goal: e.target.value });
		this.props.onSubmit(e, e.target.value);
	};

	render() {
		return (
			<div className="goal animated fadeIn ">
				<h1 className="center aligned">What is you goal for today?</h1>
				<button
					value="2hr"
					className="btn-1 goal-btn"
					onClick={this.handleGoal}>
					2 Hours
				</button>
				<button
					value="3hr"
					className="btn-2 goal-btn"
					onClick={this.handleGoal}>
					3 Hours
				</button>
				<button
					value="4hr"
					className="btn-3 goal-btn"
					onClick={this.handleGoal}>
					4 Hours
				</button>
				<button
					value="5hr"
					className="btn-4 goal-btn"
					onClick={this.handleGoal}>
					5 Hours
				</button>
			</div>
		);
	}
}

export default Goal;
