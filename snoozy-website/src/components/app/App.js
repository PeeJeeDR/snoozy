import React, { Component } from 'react';
import BigClock from '../clock/BigClock';
import Alarm from '../clock/Alarm';

class App extends Component {
	render() {
		return (
			<div className="App">
				<div className="all">
					<BigClock />
					<Alarm />
				</div>
			</div>
		);
	}
}

export default App;
