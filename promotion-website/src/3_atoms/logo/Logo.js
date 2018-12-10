import React from 'react';
import Snoozy_Logo from '../../0_loader/images/logo/Snoozy_Logo.svg';

const Logo = (props) => {
    return (
        <div className='Logo'>
            <img src={ Snoozy_Logo } alt="Logo of the Snoozy clock."/>
        </div>
    );
}

export default Logo