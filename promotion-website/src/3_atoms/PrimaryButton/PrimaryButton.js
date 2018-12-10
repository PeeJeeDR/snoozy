import React from 'react';
import Heading from '../Heading/Heading';

const PrimaryButton = (props) => {
    return (
        <button className='PrimaryButton'>
            <Heading class='h--medium'>
                { props.title } 
            </Heading>
        </button>
    );
}

export default PrimaryButton