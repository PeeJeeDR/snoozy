import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Header from '../../5_organisms/Header/Header';
import HomePage from '../../7_pages/HomePage/HomePage';

class App extends Component {
	render() {
		return (
			<div className="App">
				<Header />

				<Route exact path='/home' 	component={ HomePage }/>
			</div>
		);
	}
}

export default App;
