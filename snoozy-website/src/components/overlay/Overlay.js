import React from 'react';

const Overlay = (props) => {
/*     window.addEventListener('touchstart', () => {
        props.onOverlayPress();
    }); */

    return (
        <div 
            className={ `Overlay ${ props.active ? '' : 'dark' }` }
            onClick={ () => props.onOverlayPress() }
        >
            
        </div>
    );
}

export default Overlay