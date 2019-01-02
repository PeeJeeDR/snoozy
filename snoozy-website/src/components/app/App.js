import React, { Component } from 'react';
import BigClock from '../clock/BigClock';
import Alarm from '../clock/Alarm';
import { db } from '../../firebase/firebase';
import NotificationsOverview from '../notifications/NotificationsOverview';
import Buzz from '../../assets/audio/buzz.mp3';
import Sound from 'react-sound';
import Overlay from '../overlay/Overlay';
import axios from 'axios';
import SpotifyHandler from '../handlers/SpotifyHandler';
import GoogleMapsHandler from '../handlers/GoogleMapsHandler';


class App extends Component {
	constructor (props) {
		super(props);
		this.state = {
			// OVERLAY
			overlayIsActive: false,
		};
	}

	componentWillMount = () => {
		GoogleMapsHandler();
	}
	
	render() {
		return (
			<div className="App">
				<SpotifyHandler />
 				<Overlay onOverlayStateChange={ (state) => { this.setState({ overlayIsActive: state }) } } />
		
				<div className="all">
					<BigClock />
					<Alarm time={ this.state.totalTime }/>
					
					<NotificationsOverview active={ this.state.overlayIsActive }/>

					{/* <Sound 
						url={ Buzz }
						playStatus={ this.state.alarmIsPlaying ? Sound.status.PLAYING : Sound.status.STOPPED }
						loop={ true }
					/> */}
				</div>
			</div>
		);
	}
}

export default App;
