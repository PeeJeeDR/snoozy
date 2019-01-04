import React, { Component } from 'react';
import BigClock from '../clock/BigClock';
import Alarm from '../clock/Alarm';
import NotificationsOverview from '../notifications/NotificationsOverview';
import Overlay from '../overlay/Overlay';
// import SpotifyHandler from '../handlers/SpotifyHandler';
import GoogleMapsHandler from '../handlers/GoogleMapsHandler';
import LocationHandler from '../handlers/LocationHandler';
import GoogleCalendarHandler from '../handlers/GoogleCalendarHandler';

class App extends Component {
	constructor (props) {
		super(props);
		this.state = {
			// OVERLAY
			overlayIsActive: false,
		};
	}

	componentWillMount = () => {
		GoogleCalendarHandler();
		LocationHandler();
		GoogleMapsHandler();
	}
	
	render() {
		return (
			<div className="App">

 				<Overlay onOverlayStateChange={ (state) => { this.setState({ overlayIsActive: state }) } } />
		
				<div className="all">
					<BigClock />
					<Alarm/>

					<NotificationsOverview active={ this.state.overlayIsActive }/>
				</div>
			</div>
		);
	}
}

export default App;
