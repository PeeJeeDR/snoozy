import React from 'react';
import Logo from '../../assets/images/Snoozy_Logo_white.png';
import GhostButton from '../Buttons/GhostButton';

class Splash extends React.Component {
    render = () => {
        return (
            <div className='Splash'>
                <img src={ Logo } alt="White Snoozy logo."/>

                <div className="clock">
                    <p>Your alarm will ring at</p>
                    <h1>06:45</h1>
                </div>

                <div className="buttons">
                    <GhostButton title='DASHBOARD' link='/dashboard'/>
                </div>
            </div>
        )
    }
}

export default Splash;