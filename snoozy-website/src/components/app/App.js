import React, { Component } from 'react';
import BigClock from '../clock/BigClock';
import Alarm from '../clock/Alarm';
import { db } from '../../firebase/firebase';
import NotificationsOverview from '../notifications/NotificationsOverview';
import Buzz from '../../assets/audio/buzz.mp3';
import Sound from 'react-sound';

const google  = window.google;

class App extends Component {
	constructor (props) {
		super(props);
		this.state = {
			autoCalculateIsOn: false,
			departureTime: null,
			totalTime: null,

			destination: '',
            start_date: '',
			start_time: '',
			
			alarmIsPlaying: false,
			timeAlarmOn: 0,
		};

		this.firstRequest 	= false;
	}

	componentDidMount = () => {
		const date 		= new Date(Date.now());
		const curHour 	= date.getHours();
		let counter 	= 0;


		console.log(counter);

		this.interval = setInterval(() => { 
			this.getFirebaseData();
		}, 60000);

		this.tickInterval 	= setInterval(() => {
			this.CheckAlarm();

			if (this.state.alarmIsPlaying)
			{
				this.setState({ timeAlarmOn: this.state.timeAlarmOn + 1 });
			}

			if (this.state.timeAlarmOn === 8)
			{
				this.setState({ alarmIsPlaying: false });
			}
		}, 1000)
	}

	componentWillUnmount = () => {
		clearInterval(this.interval);
		clearInterval(this.tickInterval);
	}
	
	componentWillMount = () => {
		this.getAutoStatus();
		this.getFirebaseData();
		this.calculateTotalTime();
	}

	CheckAlarm = () => {
		console.log(this.state.totalTime.toLocaleTimeString());
		console.log(new Date().toLocaleTimeString());

		if (this.state.totalTime.toLocaleTimeString() == new Date().toLocaleTimeString())
		{
			this.setState({ alarmIsPlaying: true });
		}
	}

	getAutoStatus = () => {
		db.collection('api-data').doc('maps-data').onSnapshot(res => {
			this.setState({ autoCalculateIsOn: res.data().enabled })
		});
	}

	getFirebaseData = () => {
		db.collection('api-data').doc('maps-data').onSnapshot(res => {
			var date 	= new Date(1970, 0, 1);
			date.setSeconds(res.data().departure_time.seconds);
			this.setState({ departureTime: date });
		});

		db.collection('api-data').doc('calendar-data').onSnapshot(res => {
			this.setState({ 
				destination: res.data().location,
				start_date: res.data().start_date,
				start_time: res.data().start_time,
			});

			this.calculateTraffic(res.data().location)
		})
	}

	calculateTraffic = (from) => {
		const origin                = 'Flierenbos 20, 2370 Arendonk';
		const destination           = from;
		const calendarStartDate     = new Date(this.state.start_date + 'T' + this.state.start_time + '');
		const service               = new google.maps.DistanceMatrixService();

		service.getDistanceMatrix({
			origins: [ origin ],
			destinations: [ destination ],
			travelMode: google.maps.TravelMode.DRIVING,
			unitSystem: google.maps.UnitSystem.METRIC,
			drivingOptions: {
				departureTime: calendarStartDate,
				trafficModel: 'bestguess'
			}
		}, (response, status) => {
			console.log(response);

			if (status === 'OK')
			{
				db.collection('api-data').doc('maps-data').update({
					to: destination,
					from: origin,
					enabled: true,
					arrival_time: calendarStartDate,
					distance: response.rows[0].elements[0].distance.text,
					duration: response.rows[0].elements[0].duration.text,
					duration_in_traffic: response.rows[0].elements[0].duration_in_traffic.text,
				});
	
				calendarStartDate.setMinutes(calendarStartDate.getMinutes() - parseInt(response.rows[0].elements[0].duration_in_traffic.text));
	
				db.collection('api-data').doc('maps-data').set({
					departure_time: calendarStartDate,
				}, { merge: true });
			}
		});
	}

	calculateTotalTime = () => {
		db.collection('user-data').onSnapshot(docs => {
			docs.forEach(doc => {
				const timeFromFb 	= doc.data().time_needed
				const hours 		= parseInt(timeFromFb.split(':')[0]);
				const minutes 		= parseInt(timeFromFb.split(':')[1])

				const newDate 		= this.state.departureTime;

				newDate.setUTCHours(newDate.getHours() - hours);
				newDate.setUTCMinutes(newDate.getMinutes() - minutes);

				this.setState({ totalTime: newDate });
			});
		});
	}
	
	render() {
		return (
			<div className="App">
				<div className="all">
					<BigClock />
					<Alarm alarmOn={ false }/>
					<NotificationsOverview />

					<Sound 
						url={ Buzz }
						playStatus={ this.state.alarmIsPlaying ? Sound.status.PLAYING : Sound.status.STOPPED }
						loop={ true }
					/>
				</div>
			</div>
		);
	}
}

export default App;
