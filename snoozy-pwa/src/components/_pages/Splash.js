import React from 'react';
import Logo from '../../assets/images/Snoozy_Logo_white.png';
import GhostButton from '../Buttons/GhostButton';
import { db } from '../../firebase/firebase';
import { formatTime } from '../../global_functions/GlobalFunctions';

const snoozyRef         = db.collection('snoozy').doc('status');

class Splash extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            alarm_seconds: 0,
        };
    }
    
    componentWillMount = () => {
        snoozyRef.onSnapshot(snap => {
            this.setState({ alarm_seconds: snap.data().alarm.seconds });
        });
    }

    renderAlarm = () => {
        const date  = new Date(0);
        date.setSeconds(this.state.alarm_seconds);

        const hours     = formatTime(date.getHours());
        const minutes   = formatTime(date.getMinutes())

        return <h1>{ `${ hours }:${ minutes }` }</h1>
    }

    renderAlarmDate = () => {
        const date  = new Date(0);
        date.setSeconds(this.state.alarm_seconds);

        let dateStr     = date.toString();

        let weekday     = dateStr.substring(0,3);
        let month       = dateStr.substring(4,7);
        let day         = dateStr.substring(8,10);
        let year        = dateStr.substring(11,15);

        return <p>{weekday} {day} {month}</p>
    }
    
    render = () => {
        return (
            <div className='Splash'>
                <img src={ Logo } alt="White Snoozy logo."/>

                <div className="clock">
                    <p>Your alarm will ring at</p>
                    { this.renderAlarm() }
                    { this.renderAlarmDate() }
                </div>

                <div className="buttons">
                    <GhostButton title='DASHBOARD' link='/dashboard'/>
                </div>
            </div>
        )
    }
}

export default Splash;