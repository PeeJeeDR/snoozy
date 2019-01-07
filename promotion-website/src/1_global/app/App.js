import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Header from '../../5_organisms/Header/Header';
import HomePage from '../../7_pages/HomePage/HomePage';
import Discover from '../../7_pages/Discover/Discover';

class App extends Component {
	render() {
		return (
			<div className="App">
				
				<Route exact path='/' 	component={ HomePage }/>
				<Route exact path='/home' 	component={ HomePage }/>
				<Route exact path='/discover' 	component={ Discover }/>
			</div>
		);
	}
}

export default App;
