import React from 'react';
import SmallSectionTitle from '../Titles/SmallSectionTitle';
import { BounceLoader } from 'react-spinners';
import SwitchButton from '../Buttons/SwitchButton';
import { db } from '../../firebase/firebase';
import Paragraph from '../Paragraphs/Paragraph';

class GoogleMapsSection extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            apiLoaded: false,
        }

        this.isEnabled  = false;
        this.dbRef  = db.collection('api-data').doc('maps-data');
    }

    componentWillMount = () => {
        this.getFirebaseEnabledStatus();
    }

    getFirebaseEnabledStatus = () => {
        this.dbRef.onSnapshot(snap => {
            this.isEnabled  = snap.data().enabled;
            this.setState({ apiLoaded: true });
        }, (err) => {
            console.log(err);
        })
    }

    setFirebaseEnabledStatus = () => {
        this.dbRef.update({
            enabled: this.isEnabled,
        });
    }

    toggleSwitch = () => {
        this.isEnabled  = !this.isEnabled;
        this.setFirebaseEnabledStatus();
    }

    renderSwitch = () => {
        if (!this.state.apiLoaded) 
        {
            return <BounceLoader loading={ true } size={ 28 } color={ '#72BFA5' } />
        }
        
        return <SwitchButton onClick={ this.toggleSwitch } defaultOn={ this.isEnabled }/>
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