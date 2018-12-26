import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Splash from '../_pages/Splash';
import Dashboard from '../_pages/Dashboard';
import ExternalApps from '../_pages/ExternalApps';

class App extends Component {
	render() {
		return (
			<div className="App">
				<Route exact path='/' 				component={ Splash }/>
				<Route exact path='/dashboard' 		component={ Dashboard }/>
				<Route exact path='/external-apps' 	component={ ExternalApps }/>
			</div>
		);
	}
}

export default App;
