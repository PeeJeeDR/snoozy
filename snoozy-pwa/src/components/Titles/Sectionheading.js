import React from 'react';

const Sectionheading = (props) => {
    return (
        <h1 className='Sectionheading'>
            { props.children }
        </h1>
    );
}

export default Sectionheading