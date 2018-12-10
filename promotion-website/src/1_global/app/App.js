import React, { Component } from 'react';
import Heading from '../../3_atoms/Heading/Heading';
import PrimaryButton from '../../3_atoms/PrimaryButton/PrimaryButton';

class App extends Component {
	render() {
		return (
			<div className="App">
				<Heading class='h--darker'>Hello</Heading>
				<PrimaryButton title='Discover'/>
			</div>
		);
	}
}

export default App;
