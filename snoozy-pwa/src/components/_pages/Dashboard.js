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
            power_switch_loaded: false,
            power_status: false,

            auto_switch_loaded: false,
            auto_calculate: false,
        };

        this.auto_on    = localStorage.getItem('auto_mode')
    }

    componentDidMount = () => {
        this.loadAutoSwitch();
        this.loadPowerSwitch();
    }

    // WARNING
    renderWarning = () => {
        if (!this.state.power_status) return <WarningBox />
    }

    // MANUAL TIME ON SUBMIT
    timeOnSubmit = (time, day) => {
        let dateAlarm       = new Date();

        dateAlarm.setHours(time.split(':')[0]);
        dateAlarm.setMinutes(time.split(':')[1]);
        dateAlarm.setSeconds(0);

        console.log(dateAlarm);

        if (dateAlarm - new Date() > 0)
        {
            console.log('Later today, no changes needed!');
        }
        else 
        {
            console.log('Tomorrow, changing date to tomorrow');
            dateAlarm.setDate(dateAlarm.getDate() + 1);
        }

        snoozyRef.update({
            auto_mode: false,
            alarm: dateAlarm
        })
    }

    // MANUAL BOX
    renderManualBox = () => {
        if (!this.state.auto_calculate) return (
            <ManualBox 
                onSubmit={ this.timeOnSubmit } 
                timeAfterSubmit={ this.state.timeOnSubmit }
            />
        )
    }

    // TOGGLE POWER SWITCH
    togglePowerSnoozy = () => {
        this.setState({ power_status: !this.state.power_status });
    }

    // LOAD POWER SWITCH
    loadPowerSwitch = async () => {
        await snoozyRef.onSnapshot(snap => {
            this.setState({
                power_switch_loaded: true,
                power_status: snap.data().power_status,
            })
        })
    }

    // RENDER POWER SWITCH
    renderPowerSwitch = () => {
        if (this.state.power_switch_loaded)
        {
            return <SwitchButton 
                onClick={ this.togglePowerSnoozy } 
                labelName='Schakel je Snoozy in' 
                defaultOn={ this.state.power_status }
            />
        }
    }

    // TOGGLE AUTO SWITCH
    toggleAutoSnoozy = () => {
        localStorage.setItem('auto_mode', !localStorage.getItem('auto_mode'));

        console.log(!localStorage.getItem('auto_mode'));
    }

    // LOAD AUTO SWITCH 
    loadAutoSwitch = async () => {
        snoozyRef.get().then(snap => {
            this.setState({ 
                auto_switch_loaded: true,  
                auto_calculate: snap.data().auto_mode
            })
        });
    }

    // RENDER AUTO SWITCH
    renderAutoSwitch = () => {
        if (this.state.auto_switch_loaded)
        {
            return <SwitchButton 
                onClick={ this.toggleAutoSnoozy }
                labelName='Automatische wekker' 
                defaultOn={ this.state.auto_calculate }
            />
        }
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

                    { this.renderManualBox() }

                    { this.renderPowerSwitch() }

                </div>
            </div>
        )
    }
}

export default Dashboard;