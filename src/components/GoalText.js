import React from 'react';

class GoalText extends React.Component {
	goalRenderer = () => {
		if (this.props.goal === '2hr') {
			return ' 2 hours';
		}
		if (this.props.goal === '3hr') {
			return ' 3 hours';
		}
		if (this.props.goal === '4hr') {
			return ' 4 hours';
		}
		if (this.props.goal === '5hr') {
			return ' 5 hours';
		}
	};

	render() {
		return (
			<div className="goal-title ui segment inverted center aligned">
				Your goal today is {this.goalRenderer()}
			</div>
		);
	}
}

export default GoalText;
