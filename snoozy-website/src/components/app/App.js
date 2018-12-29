import React, { Component } from 'react';
import BigClock from '../clock/BigClock';
import Alarm from '../clock/Alarm';
import NotificationsOverview from '../notifications/NotificationsOverview';

class App extends Component {
	componentWillMount = () => {
		this.checkPowerOff();
	}

	checkPowerOff = () => {
		
	}
	
	render() {
		return (
			<div className="App">
				<div className="all">
					<BigClock />
					<Alarm alarmOn={ false }/>
					<NotificationsOverview />
				</div>
			</div>
		);
	}
}

export default App;
