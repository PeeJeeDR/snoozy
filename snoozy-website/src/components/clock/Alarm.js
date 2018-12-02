import React from 'react';
import AlarmClock from '../../assets/svg/alarm-clock.svg';

class Alarm extends React.Component {
    render = () => {
        return (
            <div className='Alarm'>
                <img src={ AlarmClock }/>
                <h3>07:39</h3>
            </div>
        )
    }
}

export default Alarm;