import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Splash from '../_pages/Splash';
import Dashboard from '../_pages/Dashboard';
import ExternalApps from '../_pages/ExternalApps';
import SnoozySettings from '../_pages/SnoozySettings';

class App extends Component {
	render() {
		return (
			<div className="App">
				<Route exact path='/' 					component={ Splash }/>
				<Route exact path='/dashboard' 			component={ Dashboard }/>
				<Route exact path='/external-apps' 		component={ ExternalApps }/>
				<Route exact path='/snoozy-settings' 	component={ SnoozySettings }/>
			</div>
		);
	}
}

export default App;
