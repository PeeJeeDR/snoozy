import React from 'react';

const PrimaryButton = (props) => {
    return (
        <button className='PrimaryButton'>
            { props.title } 
        </button>
    );
}

export default PrimaryButton