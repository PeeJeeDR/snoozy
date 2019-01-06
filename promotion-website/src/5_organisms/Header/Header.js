import React, { Component } from 'react';
import Logo from '../../3_atoms/Logo/Logo';
import Navigation from '../../4_molecules/Navigation/Navigation';

import { Link } from 'react-router-dom';


class Header extends Component {
	constructor(props){
	    super(props);
	    this.state = {
	      mainnav: "main-nav",
	    };
	}

	render() {
		return (
            <nav className="navbar">
				<Link to={`home`} className="logo"><img src="img/logo.svg" alt="Snoozy" /></Link>
				<span className="navbar-toggle" id="js-navbar-toggle" onClick={this.toggleClass.bind(this)}>
					<span className="hamburger ham-l"></span>
					<span className="hamburger ham-l"></span>
					<span className="hamburger ham-s"></span>
				</span>
				<ul className={this.state.mainnav} id="js-menu" ref="jsmenu">
			      	<li>
			    		<Link to={`home`} className={this.props.home}>Home</Link>
			      	</li>
			      	<li>
			    		<Link to={`discover`} className={this.props.discover}>Discover</Link>
			      	</li>
				</ul>
			</nav>
			);
	}
	toggleClass() {
		console.log('toggle');
	    var css = (this.state.mainnav === "main-nav") ? "main-nav active" : "main-nav";
	    this.setState({"mainnav":css});
	}
}

export default Header