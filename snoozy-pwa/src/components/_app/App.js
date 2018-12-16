import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Spotify from '../_pages/Spotify';
import Calendar from '../_pages/Calendar';
import Work from '../_pages/Work';
import Splash from '../_pages/Splash';
import Dashboard from '../_pages/Dashboard';

class App extends Component {
	render() {
		return (
			<div className="App">
				<Route exact path='/' 			component={ Splash }/>
				<Route exact path='/dashboard' 	component={ Dashboard }/>
				<Route exact path='/calendar' 	component={ Calendar }/>
				<Route exact path='/work' 		component={ Work }/>
			</div>
		);
	}
}

export default App;
