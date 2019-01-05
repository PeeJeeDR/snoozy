import React from 'react';
import Clock from '../../3_atoms/Clock/Clock';
import PrimaryButton from '../../3_atoms/PrimaryButton/PrimaryButton';
import Heading from '../../3_atoms/Heading/Heading';
import { Link } from 'react-router-dom';
import Header from '../../5_organisms/Header/Header';
import Footer from '../../5_organisms/Footer/Footer';

const HomePage = (props) => {
    return (
    	<div>
    		<Header />
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

export default HomePage