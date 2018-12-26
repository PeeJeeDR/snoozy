import React from 'react';
import { Link } from 'react-router-dom';

class GhostButton extends React.Component {
    render = () => {
        return (
            <Link to={ this.props.link } className='GhostButton'>
                { this.props.title }
            </Link>
        )
    }
}

export default GhostButton;