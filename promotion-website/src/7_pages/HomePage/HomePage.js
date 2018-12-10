import React from 'react';
import Clock from '../../3_atoms/Clock/Clock';
import Background from '../../0_loader/images/backgrounds/gradient_background.png';

const HomePage = (props) => {
    return (
        <div className='HomePage'>
            <div>
                <Clock />
            </div>
        </div>
    );
}

export default HomePage