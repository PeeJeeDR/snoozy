import React from 'react';
import Header from '../Header/Header';
import Appointment from '../Appointment/Appointment';
import SwitchButton from '../Buttons/SwitchButton';
import WarningBox from '../Boxes/WarningBox';
import ManualBox from '../Boxes/ManualBox';
import SideNavigation from '../SidebarNavigation/SideNavigation';
import { db } from '../../firebase/firebase';

const snoozyRef     = db.collection('snoozy').doc('status');

class Dashboard extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            showWarningBox: false,
            autoMode: false,
            timeOnSubmit: '',
            apiLoaded: false,
        };

        this.autoMode   = false;
        this.power      = false;
    }

    componentWillMount = () => {
        this.getAutoClock();
        this.getSnoozyStatus();
    }

    getAutoClock = () => {
        snoozyRef.get().then(res => {
            this.autoMode   = true;
        });
    }

    getSnoozyStatus = () => {
        snoozyRef.get().then(res => {
            this.power   = res.data().power_status;
            this.setState({ apiLoaded: true, autoMode: this.autoMode });
        });
    }

    timeOnSubmit = (time) => {
        this.setState({ timeOnSubmit: time });
    }

    renderManual = () => {
        if (!this.state.autoMode && this.state.apiLoaded) return <ManualBox onSubmit={ this.timeOnSubmit } timeAfterSubmit={ this.state.timeOnSubmit }/>
    }

    // AUTO SWITCH
    toggleAutoSnoozy = () => {
        snoozyRef.update({
            auto_mode: this.state.autoMode
        }).then(() => { 
            this.setState({ autoMode: !this.state.autoMode}) 
        })
    }

    renderAutoSwitch = () => {
        if (this.state.apiLoaded)
        {
            return (
                <SwitchButton 
                    onClick={() => { this.setState({ autoMode: !this.state.autoMode }) }}
                    labelName='Automatische wekker' 
                    defaultOn={ this.autoMode }
                />
            )
        }
    }

    // POWER SWITCH
    togglePowerSnoozy = () => {
        snoozyRef.update({
            power_status: this.state.powerStatus
        }).then(() => { 
            this.setState({ powerStatus: !this.state.powerStatus}) 
        })
    }

    renderPowerSwitch = () => {
        if (this.state.apiLoaded)
        {
            return (
                <SwitchButton 
                    onClick={ this.togglePowerSnoozy } 
                    labelName='Schakel je Snoozy in' 
                    defaultOn={ this.power }
                />
            )
        }
        else 
        {
            return <h1>Loading...</h1>
        }
    }

    // WARNING
    renderWarning = () => {
        if (this.apiLoaded && !this.state.showWarningBox) return <WarningBox />
    }
    
    render = () => {
        return (
            <div className='Dashboard'>
				<Header />
                <SideNavigation />

                { this.renderWarning() }

                <div className="page_wrapper">
                    <Appointment />

                    { this.renderAutoSwitch() }
                    { this.renderManual() }
                    { this.renderPowerSwitch() }
                </div>
            </div>
        )
    }
}

export default Dashboard;