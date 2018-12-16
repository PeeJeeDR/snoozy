import React from 'react';
import SidebarNavigation from '../SidebarNavigation/SidebarNavigation';
import Header from '../Header/Header';

class Calendar extends React.Component {
    render = () => {
        return (
            <div className='Calendar'>
            	<SidebarNavigation />
				<Header />

                <h1>Calendar</h1>
            </div>
        )
    }
}

export default Calendar;