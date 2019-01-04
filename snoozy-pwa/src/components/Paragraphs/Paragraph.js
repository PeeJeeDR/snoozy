import React from 'react';

const Paragraph = (props) => {
    return (
        <p className='Paragraph'>
            { props.children }
        </p>
    );
}

export default Paragraph;