import React from 'react';
import { Link } from 'react-router-dom';
import Data from '../../data/Navigation.json';

class SideNavigation extends React.Component {
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
        let items = this.state.data.map((item, i) => {
            if (!(item.slug === 'external-apps'))
            {
                return (
                    <Link to={ item.link } key={ i }>
                        <li className={ window.location.pathname === item.link ? 'active' : '' }>
                            <img src={ `/images/icons/${ item.slug }.png` } alt={ `${ item.name } Logo.` }/>
                            <p>{ item.name }</p>
                        </li>
                    </Link>
                )
            }
            else 
            {
                return (
                    <a href={ item.link } key={ i }>
                        <li className={ window.location.pathname === item.link ? 'active' : '' }>
                            <img src={ `/images/icons/${ item.slug }.png` } alt={ `${ item.name } Logo.` }/>
                            <p>{ item.name }</p>
                        </li>
                    </a>
                )
            }
        });

        return items;
    }
    
    render = () => {
        return (
            <nav className={ `SideNavigation ${ this.state.isOpen ? 'open' : '' }` }>
                <div className="overlay" onClick={ this.toggleBar }></div>

                <button onClick={ this.toggleBar }>
                    <i className="fas fa-bars"></i>
                </button>

                <ul>
                    { this.renderItems() }
                </ul>
            </nav>
        )
    }
}

export default SideNavigation;