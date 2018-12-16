import React from 'react';
import SidebarNavigation from '../SidebarNavigation/SidebarNavigation';
import Header from '../Header/Header';
import Appointment from '../Appointment/Appointment';
import SwitchButton from '../buttons/SwitchButton';
import WarningBox from '../boxes/WarningBox';

class Dashboard extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            snoozyIsOff: false,
        };
    }

    renderWarning = () => {
        if (this.state.snoozyIsOff)
        {
            return <WarningBox />;
        }
    }
    
    render = () => {
        return (
            <div className='Dashboard'>
            	{/* <SidebarNavigation /> */}
				<Header />
                { this.renderWarning() }

                <div className="page_wrapper">
                    <Appointment />
                    <SwitchButton onClick={() => this.setState({ snoozyIsOff: !this.state.snoozyIsOff })}/>
                </div>
            </div>
        )
    }
}

export default Dashboard;