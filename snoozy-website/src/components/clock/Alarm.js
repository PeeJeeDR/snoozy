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
            this.setState({ powerStatus: field.data().power_status })
        })
    }

    returnHours = () => {
        if (this.props.time.getHours() >= 0 && this.props.time.getHours() < 10)
        {
            return `0${ this.props.time.getHours() }`
        }
        else 
        {
            return this.props.time.getHours();
        }
    }

    returnMinutes = () => {
        if (this.props.time.getMinutes() >= 0 && this.props.time.getMinutes() < 10)
        {
            return `0${ this.props.time.getMinutes() }`
        }
        else 
        {
            return this.props.time.getMinutes();
        }
    }

    renderClock = () => {
        if (this.state.powerStatus)
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
            </div>
        )
    }
}

export default Alarm;