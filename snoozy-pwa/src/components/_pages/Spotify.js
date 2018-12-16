import React from 'react';
import SidebarNavigation from '../SidebarNavigation/SidebarNavigation';
import Header from '../Header/Header';

class Spotify extends React.Component {
    render = () => {
        return (
            <div className='Spotify'>
            	<SidebarNavigation />
				<Header />
                <h1>Spotify</h1>
            </div>
        )
    }
}

export default Spotify;