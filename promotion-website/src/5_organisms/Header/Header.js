import React from 'react';
import Logo from '../../3_atoms/Logo/Logo';
import Navigation from '../../4_molecules/Navigation/Navigation';

const Header = (props) => {
    return (
        <div className='Header'>
            <div className="Wrapper">
                <Logo />
                <Navigation />
            </div>
        </div>
    );
}

export default Header