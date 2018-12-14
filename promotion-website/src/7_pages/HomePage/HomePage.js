import React from 'react';
import Clock from '../../3_atoms/Clock/Clock';
import PrimaryButton from '../../3_atoms/PrimaryButton/PrimaryButton';
import Heading from '../../3_atoms/Heading/Heading';


const HomePage = (props) => {
    return (
        <div className='HomePage'>
            <div>
                <Heading class='h--darker h--large'>The alarm clock of <br/> your dreams</Heading>
                <Clock />
                <PrimaryButton title='Discover'/>
            </div>
        </div>
    );
}

export default HomePage