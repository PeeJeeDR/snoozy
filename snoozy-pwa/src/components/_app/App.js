import React, { Component } from 'react';
import SidebarNavigation from '../SidebarNavigation/SidebarNavigation';
import Header from '../Header/Header';
import { Route } from 'react-router-dom';
import Dashboard from '../_pages/Dashboard';
import Spotify from '../_pages/Spotify';
import Calendar from '../_pages/Calendar';
import Work from '../_pages/Work';

class App extends Component {
	render() {
		return (
			<div className="App">
				<SidebarNavigation />
				<Header />

				<Route exact path='/' 			component={ Dashboard }/>
				<Route exact path='/spotify' 	component={ Spotify }/>
				<Route exact path='/calendar' 	component={ Calendar }/>
				<Route exact path='/work' 		component={ Work }/>
			</div>
		);
	}
}

export default App;
