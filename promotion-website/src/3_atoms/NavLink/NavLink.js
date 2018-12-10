import React from 'react';
import Heading from '../Heading/Heading';
import { Link } from 'react-router-dom';

const NavLink = (props) => {
    return (
        <Link 
            className={ `NavLink ${ props.active ? `active` : `` }`  } 
            to={`${ props.title.toLowerCase() }`}
        >
            <li>
                <Heading class='h--darker h--small'>{ props.title }</Heading>
            </li>
        </Link>
    );
}

export default NavLink