import React, { Component } from 'react';
import UIfx from 'uifx';
import popAudio from './sounds/pop.mp3';

const pop = new UIfx(popAudio, {
	volume: 0.5,
});
export class RestControll extends Component {
	state = { activeRest: 'no-rest' };

	handleRestSelection = (e) => {
		this.setState({ activeRest: e.target.classList[0] });
		pop.play();
		this.props.onRest(e.target.classList[0]);
	};

	render() {
		return (
			<div className="alert-me-styles">
				<h1>Rest every...</h1>
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
		);
	}
}

export default RestControll;
