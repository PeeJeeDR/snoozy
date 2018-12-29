import React, { Component } from 'react';
import BigClock from '../clock/BigClock';
import Alarm from '../clock/Alarm';
import { db } from '../../firebase/firebase';
import NotificationsOverview from '../notifications/NotificationsOverview';

class App extends Component {
	constructor (props) {
		super(props);
		this.state = {
			departureTime: null,
			totalTime: null,
		};
	}
	
	componentWillMount = () => {
		this.getFirebaseData();
	}

	getFirebaseData = () => {
		db.collection('api-data').doc('maps-data').onSnapshot(res => {
			var date 	= new Date(1970, 0, 1);
			date.setSeconds(res.data().departure_time.seconds);

			this.setState({ departureTime: date });
		});

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
		})

		/* db.collection('user-data').doc('time_needed').onSnapshot(res => {
			var date 	= new Date(1970, 0, 1);
			date.setSeconds(res.data());

			this.setState({ totalTime: this.state.departureTime + date });
		}); */
	}
	
	render() {
		return (
			<div className="App">
				<div className="all">
					<BigClock />
					<Alarm alarmOn={ false }/>
					<NotificationsOverview />
				</div>
			</div>
		);
	}
}

export default App;
