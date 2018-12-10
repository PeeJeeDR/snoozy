import React from 'react';
import NavLink from '../../3_atoms/NavLink/NavLink';

const Navigation = (props) => {
    return (
        <nav className='Navigation'>
            <ul>
                <NavLink title='Home' active={ true }/>
                <NavLink title='Discover'/>
            </ul>
        </nav>
    );
}

export default Navigation