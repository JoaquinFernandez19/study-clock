import React from 'react';
import './styles/App.scss';
//Components
import Clock from './Clock';

class App extends React.Component {
	render() {
		return (
			<div className="main-block">
				<Clock />
			</div>
		);
	}
}

export default App;
