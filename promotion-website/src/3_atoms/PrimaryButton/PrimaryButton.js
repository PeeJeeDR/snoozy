import React from 'react';
import Heading from '../Heading/Heading';

const PrimaryButton = (props) => {
    return (
        <button className='PrimaryButton'>
        {/*
            <Heading class='h--medium'>
                { props.title } 
            </Heading>
         */}
         <h1>{props.title}</h1>
        </button>
    );
}

export default PrimaryButton