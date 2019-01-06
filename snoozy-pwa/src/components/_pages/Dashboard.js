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
            powerStatus: false,
        };
    }

    componentWillMount = () => {
        console.log(this.state.apiLoaded);
        this.getAutoClock();
        this.getSnoozyStatus();
    }

    componentDidMount = () => {
        console.log(this.state.apiLoaded);        
    }

    getAutoClock = () => {
        snoozyRef.onSnapshot(snap => {
            this.setState({ autoMode: snap.data().autoMode });
        })
    }

    getSnoozyStatus = () => {
        snoozyRef.onSnapshot(res => {
            this.setState({ powerStatus: res.data().power_status })
        }, () => { this.setState({ apiLoaded: true })})
    }

    timeOnSubmit = (time) => {
        this.setState({ timeOnSubmit: time });
    }

    renderManual = () => {
        if (this.state.autoMode)
        {
            return (
                <ManualBox 
                    onSubmit={ this.timeOnSubmit }
                    timeAfterSubmit={ this.state.timeOnSubmit }     
                />
            )
        }
    }

    togglePowerSnoozy = () => {
        snoozyRef.update({
            power_status: this.state.powerStatus
        }).then(() => { 
            this.setState({ powerStatus: !this.state.powerStatus}) 
        })
    }
    
    render = () => {
        return (
            <div className='Dashboard'>
				<Header />
                <SideNavigation />

                { this.state.apiLoaded && !this.state.showWarningBox ? <WarningBox /> : '' }

                <div className="page_wrapper">
                    <Appointment />

                    {
                        this.state.apiLoaded
                        ?
                        <SwitchButton 
                            onClick={() => this.setState({ setToManual: !this.state.setToManual })}
                            labelName='Automatische wekker'
                            defaultOn={ this.state.autoMode }
                        />
                        : 
                        <p>Loading...</p>
                    }

                    { this.renderManual() }

                    {
                        this.state.apiLoaded
                        ?
                        <SwitchButton 
                            onClick={ this.togglePowerSnoozy }
                            labelName='Schakel je Snoozy in'
                            defaultOn={ this.state.powerStatus }
                        />
                        :
                        ''
                    }
                </div>
            </div>
        )
    }
}

export default Dashboard;