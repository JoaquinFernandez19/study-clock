import React from 'react';

class GoalText extends React.Component {
	render() {
		return (
			<div className="goal-title ui segment inverted center aligned">
				Your goal today is{' '}
				{this.props.goal === 1
					? `${this.props.goal} hour`
					: `${this.props.goal} hours`}
			</div>
		);
	}
}

export default GoalText;
