import React from 'react';
import SidebarNavigation from '../SidebarNavigation/SidebarNavigation';
import Header from '../Header/Header';
import Appointment from '../Appointment/Appointment';
import SwitchButton from '../buttons/SwitchButton';
import WarningBox from '../boxes/WarningBox';
import ManualBox from '../boxes/ManualBox';

class Dashboard extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            snoozyIsOff: false,
            setToManual: false,
        };
    }

    renderWarning = () => {
        if (this.state.snoozyIsOff)
        {
            return <WarningBox />;
        }
    }

    renderManual = () => {
        if (this.state.setToManual)
        {
            return <ManualBox />
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

                    <SwitchButton 
                        onClick={() => this.setState({ setToManual: !this.state.setToManual })}
                        labelName='Automatische wekker'
                    />

                    { this.renderManual() }

                    <SwitchButton 
                        onClick={() => this.setState({ snoozyIsOff: !this.state.snoozyIsOff })}
                        labelName='Schakel je Snoozy in'
                    />
                </div>
            </div>
        )
    }
}

export default Dashboard;