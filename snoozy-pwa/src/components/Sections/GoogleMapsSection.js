import React from 'react';
import SmallSectionTitle from '../Titles/SmallSectionTitle';
import { BounceLoader } from 'react-spinners';
import SwitchButton from '../Buttons/SwitchButton';
import { db } from '../../firebase/firebase';
import Paragraph from '../Paragraphs/Paragraph';

const snoozyRef = db.collection('snoozy').doc('status');

class GoogleMapsSection extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            apiLoaded: false,
        }

        this.isEnabled  = false;
    }

    componentWillMount = () => {
        this.getFirebaseEnabledStatus();
    }

    getFirebaseEnabledStatus = () => {
        snoozyRef.onSnapshot(snap => {
            this.isEnabled  = snap.data().maps_enabled;
        }, (err) => {
            console.log(err);
        });

        this.setState({ apiLoaded: true });
    }

    setFirebaseEnabledStatus = () => {
        snoozyRef.update({
            maps_enabled: this.isEnabled,
        });
    }

    toggleSwitch = () => {
        this.isEnabled  = !this.isEnabled;
        this.setFirebaseEnabledStatus();
    }

    renderSwitch = () => {
        if (this.state.apiLoaded) 
        {
            return <SwitchButton onClick={ this.toggleSwitch } defaultOn={ this.isEnabled }/>
        }

        return <BounceLoader loading={ true } size={ 28 } color={ '#72BFA5' } />
    }
    
    render = () => {
        return (
            <div className='GoogleMapsSection'>
                <div className='titleSection'>
                    <div>
                        <img src="/images/icons/travel.png" alt="Google calendar icon."/>
                        <SmallSectionTitle title='Reistijd berkenen'/>
                    </div>

                    { this.renderSwitch() }
                </div>

                <Paragraph>
                    Door dit in te schakelen zal je Snoozy de tijd berekenen die er nodig is om 
                    je te verplaatsen van jou thuis naar het werk. Deze functie werkt enkel na 
                    het verbinden met je Google Calendar.
                </Paragraph>
            </div>
        )
    }
}

export default GoogleMapsSection;