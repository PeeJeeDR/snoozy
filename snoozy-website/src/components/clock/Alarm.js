import React from 'react';
import AlarmClock from '../../assets/svg/alarm-clock.svg';
import { db } from '../../firebase/firebase';
import Buzz from '../../assets/audio/buzz.mp3';
import Sound from 'react-sound';

const snoozyRef     = db.collection('snoozy').doc('status');
const userRef       = db.collection('snoozy').doc('user-data');
const mapsRef       = db.collection('api-data').doc('maps-data');

const test_alarm    = new Date();
test_alarm.setSeconds(test_alarm.getSeconds() + 5)

class Alarm extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            powerStatus: false,
            timeNeeded: null,
            alarm: null,
            apiLoaded: false,
            alarmIsPlaying: null,
            alarmTime: 3, 
        };

        this.counter    = 0;
    }

    componentDidMount = () => {
        this.secondsInterval    = setInterval(() => {
            if (this.state.alarm !== null)
            {
                const temp_date     = new Date(0)
                const cur_seconds   = Math.floor(new Date().getTime() / 1000);
                // const alarm_seconds = Math.floor(this.state.alarm.getTime() / 1000);
                const alarm_seconds = Math.floor(this.state.alarm.getTime() / 1000);
                
                if (cur_seconds === Math.floor(test_alarm.getTime() / 1000))
                {
                    this.setState({ alarmIsPlaying: true })
                }

                if (this.state.alarmIsPlaying)
                {
                    this.counter++;

                    if (this.counter === this.state.alarmTime)
                    {
                        this.counter    = 0;
                        this.setState({ alarmIsPlaying: false })
                    }
                }
            }
        }, 1000)
    }

    componentWillUnmount = () => {
        clearInterval(this.secondsInterval)
    }
    
    componentWillMount = () => {
        userRef.onSnapshot(snap => {
            this.calculateAlarm(snap.data().time_needed)
        }, err => {
            console.log('Something went wrong...', err);
        })

        snoozyRef.onSnapshot(snap => {
            this.setState({ powerStatus: snap.data().power_status })
        });
    }

    calculateAlarm = (time_needed) => {
        const hours     = parseInt(time_needed.split(':')[0]);
        const minutes   = parseInt(time_needed.split(':')[1]);

        const time_needed_to_seconds  = (Math.floor(hours * 3600)) + (Math.floor(minutes * 60));

        mapsRef.onSnapshot(snap => {
            const date  = new Date(0);
            date.setSeconds(snap.data().departure_date.seconds - time_needed_to_seconds);
            this.saveAlarm(date);
        })
    }

    saveAlarm = (date) => {
        this.setState({ alarm: date, apiLoaded: true })
        
        snoozyRef.update({
            alarm: date
        }).catch(err => {
            console.log('Something went wrong...', err);
        })
    }

    returnHours = () => {
        if (this.state.alarm.getHours() >= 0 && this.state.alarm.getHours() < 10)
        {
            return `0${ this.state.alarm.getHours() }`
        }
        else 
        {
            return this.state.alarm.getHours();
        }
    }

    returnMinutes = () => {
        if (this.state.alarm.getMinutes() >= 0 && this.state.alarm.getMinutes() < 10)
        {
            return `0${ this.state.alarm.getMinutes() }`
        }
        else 
        {
            return this.state.alarm.getMinutes();
        }
    }

    renderClock = () => {
        if (this.state.powerStatus && this.state.apiLoaded)
        {
            return (
                <div>
                    <img src={ AlarmClock } alt='Clock icon.'/>
                    <h3>{ `${ this.returnHours() }:${ this.returnMinutes() }` }</h3>
                </div>
            )
        }
        else
        {
            return <h5>Snoozy is uitgeschakeld</h5>
        }
    }
    
    render = () => {
        return (
            <div className='Alarm'>
                { this.renderClock() }

                <Sound 
                    url={ Buzz }
                    playStatus={ this.state.alarmIsPlaying ? Sound.status.PLAYING : Sound.status.STOPPED }
                    loop={ true }
                />
            </div>
        )
    }
}

export default Alarm;