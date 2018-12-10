import React from 'react';
import Snoozy_Logo from '../../0_loader/images/logo/Snoozy_Logo.svg';

const Logo = (props) => {
    return (
        <img className='Logo' src={ Snoozy_Logo } alt="Logo of the Snoozy clock."/>
    );
}

export default Logo