import React from 'react';
import Logo from '../../assets/images/Snoozy_Logo.png';

const Header = (props) => {
    return (
        <div className='Header'>
            <img src={ Logo } alt="Logo of Snoozy."/>
        </div>
    );
}

export default Header