import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Spotify from '../_pages/Spotify';
import Calendar from '../_pages/Calendar';
import Work from '../_pages/Work';
import Splash from '../_pages/Splash';
import Dashboard from '../_pages/Dashboard';
import Settings from '../_pages/Settings';

class App extends Component {
	render() {
		return (
			<div className="App">
				<Route exact path='/' 			component={ Splash }/>
				<Route exact path='/dashboard' 	component={ Dashboard }/>
				<Route exact path='/settings' 	component={ Settings }/>
				<Route exact path='/settings/snoozy' 	component={ Work }/>
			</div>
		);
	}
}

export default App;
