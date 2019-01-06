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
	    };
	}
	render() {
		
		return (
        	<div>
	    		<Header discover={this.state.discover} home={this.state.home} />
			        <div className='HomePage'>
			            <div>
			                <Heading class='h--darker h--large'>The alarm clock of <br/> your dreams</Heading>
			                <Clock />
			                <Link to={`discover`}><PrimaryButton title='Discover'/></Link>
			            </div>
		        	</div>
		      	<Footer />
		    </div>
        );
	}
}

export default HomePage