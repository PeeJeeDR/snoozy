import React from 'react';
import SidebarNavigation from '../SidebarNavigation/SidebarNavigation';
import Header from '../Header/Header';

class Work extends React.Component {
    render = () => {
        return (
            <div className='Work'>
            	<SidebarNavigation />
				<Header />
                <h1>Work</h1>
            </div>
        )
    }
}

export default Work;