import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableNativeFeedback, Linking } from 'react-native';

export default class App extends Component {
	constructor (props) {
		super(props);
		this.state = {
			events: [],
		};
	}

	getEvents = () => {
		let that 	= this;

		start = () => {
			gapi.client.init({
				'apiKey': 'AIzaSyBRi2VgLA9ruMoC6GBT6DZq_G-dVO3v1Mc'
			}).then(() => {
				console.log('hello');
			})
		}

		gapi.load('client', start)
	}

	componentDidMount = () => {
		this.getEvents();
	}
	
	componentWillMount = () => {
		const baseURL 	= 'https://apis.google.com/js/api.js';

		const script 	= document.createElement('script');
		script.src 		= baseURL;

		/* Linking.getInitialURL().then(baseURL => {
			if (baseURL) 
			{
				console.log('Initial url is: ' + baseURL);
			}
		}).catch(err => console.log('An error occurred', err)); */
	}
	
	render = () => {
		return (
			<View>
				<Text>Google Calendar</Text>
				<TouchableNativeFeedback onPress={ this.auth }>
					<View>
						<Text>Autorize</Text>
					</View>
				</TouchableNativeFeedback>

				<TouchableNativeFeedback onPress={ this.logout }>
					<View>
						<Text>Sign out</Text>
					</View>
				</TouchableNativeFeedback>
			</View>
		);
	}
}

const styles = StyleSheet.create({

});
