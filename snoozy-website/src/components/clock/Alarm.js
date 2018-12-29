import React from 'react';
import AlarmClock from '../../assets/svg/alarm-clock.svg';
import { db } from '../../firebase/firebase';

class Alarm extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            powerStatus: false
        };
    }
    
    componentWillMount = () => {
        db.collection('snoozy').doc('status').onSnapshot(field => {
            console.log(field.data().power_status);
            this.setState({ powerStatus: field.data().power_status })
        })
    }

    renderClock = () => {
        if (this.state.powerStatus)
        {
            return (
                <div>
                    <img src={ AlarmClock } alt='Clock icon.'/>
                    <h3>07:39</h3>
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
            </div>
        )
    }
}

export default Alarm;