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
            power_status: false,
        };
    }

    componentDidMount = () => {
        this.checkPowerStatus();
    }

    checkPowerStatus = async () => {
        await snoozyRef.onSnapshot(snap => {
            this.setState({ 
                alarm_seconds: snap.data().alarm.seconds,
                power_status: snap.data().power_status
            });
        });
    }

    renderAlarm = () => {
        const time  = new Date(0);
        const date  = new Date(0);

        time.setSeconds(this.state.alarm_seconds);
        date.setSeconds(this.state.alarm_seconds);

        const hours     = formatTime(time.getHours());
        const minutes   = formatTime(time.getMinutes());

        let dateStr     = date.toString();
        let weekday     = dateStr.substring(0,3);
        let month       = dateStr.substring(4,7);
        let day         = dateStr.substring(8,10);
        let year        = '';

        //if current year is NOT same as alarm year, add year to return
        if (date.getFullYear() !== dateStr.substring(11,15))
        {
            year        = ' ' + dateStr.substring(11,15); 
        }       

        if (this.state.power_status && this.state.alarm_seconds !== 0 && this.state.alarm_seconds !== '')
        {    
            return (
                <div>
                    <p>Your alarm will ring at</p>
                    <h1>{ `${ hours }:${ minutes }` }</h1>
                    <p>{weekday} {day} {month}{year}</p>
                </div>
            )
        }
        else 
        {
            return (
                <div className='splash_container'>
                    <p>
                        Je snoozy is uitgeschakeld. 
                        Ga naar het dashboard om hem terug in te schakelen.
                    </p>
                </div> 
            )
        }
    }
    
    render = () => {
        return (
            <div className='Splash'>
                <img src={ Logo } alt="White Snoozy logo."/>

                <div className="clock">
                    { this.renderAlarm() }
                </div>

                <div className="buttons">
                    <GhostButton title='DASHBOARD' link='/dashboard'/>
                </div>
            </div>
        )
    }
}

export default Splash;