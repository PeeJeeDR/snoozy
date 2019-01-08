import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import Header from '../../5_organisms/Header/Header';
import Footer from '../../5_organisms/Footer/Footer';


class Discover extends Component {
	constructor(props){
	    super(props);
	    this.state = {
	      discover: "nav-links nav-active",
	      home: "nav-links",
	      purchase: "nav-links",
	    };
	}
	render() {
		
		return (
        <div className='Discover'>
        	<Header discover={this.state.discover} home={this.state.home} purchase={this.state.purchase} />
        	<div className="discover-wrapper">
			    <div className="main">
			        <h1>DISCOVER</h1>
			        <span className="underline"></span>
			        <div className="all-discover-cards">
						<div className="discover-card">
							<span className="card-logo"><img id="clock" src="/img/alarm-clock.svg" alt="Alarm Clock"/></span>
							<h3 className="card-title">Easy alarm</h3>
							<p className="card-text">Make your alarm go off at your own pace</p>
						</div>
						<div className="discover-card">
							<span className="card-logo"><img id="calendar" src="/img/google-calendar.svg" alt="Google Calendar"/></span>
							<h3 className="card-title">Google Calendar</h3>
							<p className="card-text">Connect your Google Calendar to Snoozy</p>
						</div>
						<div className="discover-card">
							<span className="card-logo"><img id="transport" src="/img/public-transport-subway.svg" alt="Transport"/></span>
							<h3 className="card-title">Transport</h3>
							<p className="card-text">Snoozy automatically calculates your transit time</p>
						</div>
						<div className="discover-card">
							<span className="card-logo"><img id="snooze" src="/img/snooze.svg" alt="Snoozing"/></span>
							<h3 className="card-title">Snoozing</h3>
							<p className="card-text">Set up your perfect amount of snoozes</p>
						</div>
						<div className="discover-card">
							<span className="card-logo"><img id="spotify" src="/img/spotify.svg" alt="Spotify"/></span>
							<h3 className="card-title">Spotify</h3>
							<p className="card-text">Choose your wake-up song with Spotify</p>
						</div>
			        </div>
			    </div>
		    </div>
		    <Footer />
        </div>
        );
	}
}

export default Discover