import React from 'react';
import AlarmClock from '../../assets/svg/alarm-clock.svg';
import { db } from '../../firebase/firebase';
import axios from 'axios';
import * as config from '../../config/IpConfig';
import { formatTime, returnAlarmDate } from '../../global_functions/GlobalFunctions';

const snoozyRef             = db.collection('snoozy').doc('status');
const snoozySettingsRef     = db.collection('snoozy').doc('settings');
const userRef               = db.collection('snoozy').doc('user-data');
const mapsRef               = db.collection('api-data').doc('maps-data');

class Alarm extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            powerStatus: false,
            auto_mode: false,
            timeNeeded: null,
            alarm: null,
            apiLoaded: false,
            alarmIsPlaying: null,
            alarmTime: 8,
            snoozed: false,
            song: null,
            alwaysOnColor: null,
            alarmColor: null,
            noAlarmSet: false,
        };

        this.counter        = 0;
        this.times_snoozed  = 0;
        this.snooze_counter = 0;
    }

    componentDidMount = () => {
        this.getAutoMode();
        const test_alarm    = new Date();
        test_alarm.setSeconds(test_alarm.getSeconds() + 4);

        this.secondsInterval    = setInterval(() => {
            if (this.state.snoozed)
            {
                // SET HOW MANY TIMES SNOOZED
                this.snooze_counter++;

                // SHUT ALARM AFTER 3 TIMES SNOOZED
                if (this.times_snoozed === 3)
                {
                    console.log('END OF SNOOZE');
                    this.setState({ alarmIsPlaying: false, snoozed: false })
                }
                
                // IF 5 MINUTES ARE OVER
                if (this.snooze_counter === 5) 
                {
                    this.ringAlarm();
                }
            }

            if (this.state.alarm !== null && this.state.powerStatus)
            {
                const cur_seconds   = Math.floor(new Date().getTime() / 1000);
                const alarm_seconds = Math.floor(this.state.alarm.getTime() / 1000);
                
                // For test purposes. Comment next if when uncommenting this one.
                /* if (cur_seconds === (Math.floor(test_alarm.getTime() / 1000) + 2))
                {
                    this.ringAlarm();
                } */

                let date    = new Date(0);
                date.setSeconds(alarm_seconds);
                console.log('ALARM', date);

                if (cur_seconds === alarm_seconds)
                {
                    console.log('EXECUTED?');
                    this.setState({ alarmIsPlaying: true });
                    this.ringAlarm();
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

        snoozySettingsRef.get().then(res => {
            this.setState({ 
                song: res.data().song,
                alwaysOnColor: res.data().always_on_color,
                alarmColor: res.data().alarm_color
            })
        })
    }

    getAutoMode = async () => {
        await snoozyRef.onSnapshot(snap => {
            this.setState({ auto_mode: snap.data().auto_mode })
        })
    }

    ringAlarm = async () => {
        if (this.counter === 0)
        {
            if (this.state.song !== null) 
            {
                axios.post(`http://${ config.RASPBERRY_PI_IP }/ambi-light-off`);

                const res   = await axios.post(`http://${ config.RASPBERRY_PI_IP }/blink`, { 
                    led_color: this.state.alarmColor,
                    audio: 'true',
                    sound: this.state.song
                }, (err) => { return err });

                //console.log(res);

                this.setState({ alarmIsPlaying: true });

                if (res.data === 'POWER_OFF')
                {
                    this.times_snoozed  = 0;
                    this.setState({ alarmIsPlaying: false, snoozed: false });

                    snoozyRef.update({
                        alarm: null,
                    })

                    axios.post(`http://${ config.RASPBERRY_PI_IP }/ambi-light`, {
                        led_color: this.state.alwaysOnColor,
                    })
                }
    
                if (res.data === 'SNOOZE')
                {
                    this.snooze_counter     = 0;
                    this.times_snoozed++;
                    this.setState({ snoozed: true, alarmIsPlaying: false });
                }
            }
        }
    }

    calculateAlarm = (time_needed) => {
        const hours     = parseInt(time_needed.split(':')[0]);
        const minutes   = parseInt(time_needed.split(':')[1]);

        const time_needed_to_seconds  = ((Math.floor(parseInt(hours) * 3600)) + (Math.floor(parseInt(minutes) * 60)));

        mapsRef.onSnapshot(snap => {
            const date  = new Date(0);

            if (snap.data().alarm !== null)
            {
                date.setSeconds(snap.data().departure_date.seconds - time_needed_to_seconds);
                this.saveAlarm(date);
            }
            else 
            {
                this.setState({ noAlarmSet: true })
            }
        })
    }

    saveAlarm = (date) => {
        if (this.state.auto_mode)
        {
            this.setState({ alarm: date, apiLoaded: true })
            
            snoozyRef.update({
                alarm: date
            }).catch(err => {
                console.log('Something went wrong...', err);
            })
        }
        else 
        {
            snoozyRef.onSnapshot(snap => {
                if (snap.data().alarm !== null) 
                {
                    let date = new Date(0);
                    date.setSeconds(snap.data().alarm.seconds)
                    
                    this.setState({ alarm: date, apiLoaded: true })
                }
            })
        }
    }

    renderClock = () => {
        let playing     = false;

        if (this.state.powerStatus && this.state.apiLoaded && !this.state.alarmIsPlaying)
        {
            if (this.state.snoozed)
            {
                return <h5>ALARM GESNOOZED</h5>
            }
            else 
            {
                return (
                    <div className={ `${ playing }` }>
                        <img src={ AlarmClock } alt='Clock icon.'/>
                        <h3>{ `${ formatTime(this.state.alarm.getHours()) }:${ formatTime(this.state.alarm.getMinutes()) }` }</h3>
                        <h3>{ returnAlarmDate(this.state.alarm) }</h3>                      
                    </div>
                )
            }
        }
        else if (this.state.alarmIsPlaying)
        {
            return <h5>ALARM GAAT AF!</h5>
        }
        else
        {
            if (this.state.noAlarmSet)
            {
                return <h5>Er is momenteel geen wekker ingesteld</h5>
            }

            return <h5>Snoozy is uitgeschakeld</h5>
        }
    }
    
    render = () => {
        return (
            <div className='Alarm'>
                { this.renderClock() }
            </div>
        )
    }
}

export default Alarm;