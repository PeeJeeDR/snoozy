import React from 'react';
import SidebarNavigation from '../SidebarNavigation/SidebarNavigation';
import Header from '../Header/Header';
import Appointment from '../Appointment/Appointment';

class Dashboard extends React.Component {
    render = () => {
        return (
            <div className='Dashboard'>
            	<SidebarNavigation />
				<Header />

                <div className="page_wrapper">
                    <Appointment />
                </div>
            </div>
        )
    }
}

export default Dashboard;