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
                        <img src="/images/icons/travel.png" alt="Travel icon."/>
                        <SmallSectionTitle title='Reistijd Voorspellen'/>
                    </div>

                    { this.renderSwitch() }
                </div>

                <Paragraph>
                    Door dit in te schakelen zal je Snoozy de locatie van je eerste afspraak 
                    opvragen en de reisijd voorspellen op basis van de drukte van het verkeer. 
                </Paragraph>
                <Paragraph>
                    <strong>LET OP:</strong> Als je besluit om dit uit te schakelen, moet je zelf de reistijd optellen bij de Extra Tijd onder de Snoozy instellingen.
                </Paragraph>
                <Paragraph>
                    <strong>LET OP:</strong> Deze functie werkt enkel na het verbinden met je Google Calendar.
                    
                </Paragraph>
            </div>
        )
    }
}

export default GoogleMapsSection;