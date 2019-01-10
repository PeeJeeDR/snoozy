import React, { Component } from 'react';
import Clock from '../../3_atoms/Clock/Clock';
import PrimaryButton from '../../3_atoms/PrimaryButton/PrimaryButton';
import Heading from '../../3_atoms/Heading/Heading';
import { Link } from 'react-router-dom';
import Header from '../../5_organisms/Header/Header';
import Footer from '../../5_organisms/Footer/Footer';

class HomePage extends Component {
	constructor(props){
	    super(props);
	    this.state = {
	      discover: "nav-links",
	      home: "nav-links nav-active",
	      purchase: "nav-links",
	    };
	}
	render() {
		
		return (
        	<div className='HomePage'>
	    		<Header discover={this.state.discover} home={this.state.home} purchase={this.state.purchase} />
	            <div className="main">
	            	<div className='title-header'>
	            		<h1>Snoozy</h1>
	            		<h5>The alarm clock that will never let you down</h5>
	            	</div>
	            	{/*
	            	<!--
	                <Heading className='h--darker h--large'>The alarm clock of <br/> your dreams</Heading>
	                <Clock />
	                <Link to={`discover`}><PrimaryButton title='Discover'/></Link>-->
	                */}

	                <Link to={`discover`}><PrimaryButton title='Discover'/></Link>
	            </div>

		      	<Footer />
		    </div>
        );
	}
}

export default HomePage