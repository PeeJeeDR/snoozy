import React from 'react';

const Heading = (props) => {
    return (
        <h1 className={ `Heading ${ props.class }` }>
            { props.children }
        </h1>
    );
}

export default Heading