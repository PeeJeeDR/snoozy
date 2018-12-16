import React from 'react';
import Sidebar from "react-sidebar";
import Data from '../../data/SidebarNavigation.json';
import { Link } from 'react-router-dom';

class SidebarNavigation extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            data: [],
            isOpen: false,
        };
    }

    componentWillMount = () => {
        this.setState({ data: Data.data });
    }

    toggleBar = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    renderItems = () => {
        return this.state.data.map((item, i) => (
            <Link key={ i } to={ item.link } onClick={ this.toggleBar }>
                <li className={ window.location.pathname === item.link ? 'active' : '' }>
                    <img src={ `/images/icons/${ item.slug }.png` } alt={ `${ item.name } Logo.` }/>
                    <p>{ item.name }</p>
                </li>
            </Link>
        ))
    }
    
    render = () => {
        return (
            <nav className='SidebarNavigation'>
                <Sidebar
                    sidebar={ this.renderItems() }
                    open={ this.state.isOpen }
                    onSetOpen={ this.toggleBar }
                    sidebarClassName='bar'
                >
                    <button onClick={ this.toggleBar }>
                        <i className="fas fa-bars"></i>
                    </button>
                </Sidebar>
            </nav>
        )
    }
}

export default SidebarNavigation;