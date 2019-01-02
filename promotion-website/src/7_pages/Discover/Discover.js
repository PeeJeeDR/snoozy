import React, { Component } from 'react';
import Clock from '../../3_atoms/Clock/Clock';
import PrimaryButton from '../../3_atoms/PrimaryButton/PrimaryButton';
import Heading from '../../3_atoms/Heading/Heading';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';


class Discover extends Component {
	constructor(props){
	    super(props);
	    this.state = {
	      mainnav: "main-nav"
	    };
	}



	render() {
		
		return (
        <div className='Discover'>
            <nav className="navbar">
				<Link to={`home`} className="logo"><img src="img/logo.svg" alt="Snoozy" /></Link>
				<span className="navbar-toggle" id="js-navbar-toggle" onClick={this.toggleClass.bind(this)}>
					<span className="hamburger ham-l"></span>
					<span className="hamburger ham-l"></span>
					<span className="hamburger ham-s"></span>
				</span>
				<ul className={this.state.mainnav} id="js-menu" ref="jsmenu">
			      	<li>
			    		<Link to={`home`} className="nav-links">Home</Link>
			      	</li>
			      	<li>
			    		<Link to={`discover`} className="nav-links">Discover</Link>
			      	</li>
				</ul>
			</nav>
		    <div className="main">
		        <h1>DISCOVER</h1>
		        <span className="underline"></span>
		        <div className="all-discover-cards">
					<div className="discover-card">
						<span className="card-logo"><img id="clock" src="img/alarm-clock.svg" alt="Alarm Clock"/></span>
						<h3 className="card-title">Easy alarm</h3>
						<p className="card-text">Make your alarm go off at your own pace</p>
					</div>
					<div className="discover-card">
						<span className="card-logo"><img id="calendar" src="img/google-calendar.svg" alt="Google Calendar"/></span>
						<h3 className="card-title">Google Calendar</h3>
						<p className="card-text">Connect your Google Calendar to Snoozy</p>
					</div>
					<div className="discover-card">
						<span className="card-logo"><img id="transport" src="img/public-transport-subway.svg" alt="Transport"/></span>
						<h3 className="card-title">Transport</h3>
						<p className="card-text">Snoozy automatically calculates your transit time</p>
					</div>
					<div className="discover-card">
						<span className="card-logo"><img id="snooze" src="img/snooze.svg" alt="Snoozing"/></span>
						<h3 className="card-title">Snoozing</h3>
						<p className="card-text">Set up your perfect amount of snoozes</p>
					</div>
					<div className="discover-card">
						<span className="card-logo"><img id="spotify" src="img/spotify.svg" alt="Spotify"/></span>
						<h3 className="card-title">Spotify</h3>
						<p className="card-text">Choose your wake-up song with Spotify</p>
					</div>
		        </div>
		    </div>
		    <footer className="footer">
		    	<h2 className="footer-title">Snoozy</h2>
		    	<div className="main-footer">
			    	<div className="footer-list">
			    		<h4 className="footer-list-title">Links</h4>
			    		<a href="#" className="f-link">Home</a>
			    		<a href="#" className="f-link">Discover</a>
			    	</div>
			    	<div className="footer-list">
			    		<h4 className="footer-list-title">Socials</h4>
			    		<a href="#" className="f-link">Facebook</a>
			    		<a href="#" className="f-link">Twitter</a>
			    	</div>
			    	<div className="footer-list">
			    		<h4 className="footer-list-title">Contact</h4>
			    		<a href="#" className="f-link">Contact</a>
			    	</div>
			    </div>
		    </footer>
        </div>);
	}
	toggleClass() {
		console.log('toggle');
	    var css = (this.state.mainnav === "main-nav") ? "main-nav active" : "main-nav";
	    this.setState({"mainnav":css});
	}
}

export default Discover