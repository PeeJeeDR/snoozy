import React from 'react';
import SmallSectionTitle from '../Titles/SmallSectionTitle';
import { BounceLoader } from 'react-spinners';
import SwitchButton from '../Buttons/SwitchButton';
import { db } from '../../firebase/firebase';
import Paragraph from '../Paragraphs/Paragraph';

const google  = window.google;

class GoogleMapsSection extends React.Component {
    constructor (props) {
        super(props);

        this.apiLoaded  = false;
        this.isEnabled  = false;
    }

    componentWillMount = () => {
        this.getFirebaseEnabledStatus();
    }

    getFirebaseEnabledStatus = () => {
        db.collection('api-data').doc('maps-data').get()
            .then((res) => {
                this.isEnabled  = res.data().enabled;
                this.apiLoaded  = true;

                if (res.data().enabled)
                {
                    this.collectMapsData();
                }
            })
    }

    setFirebaseEnabledStatus = () => {
        db.collection('api-data').doc('maps-data').set({
            enabled: this.isEnabled,
        })
    }

    collectMapsData = () => {
        var origin          = 'Flierenbos 20, 2370 Arendonk';
        var destination     = 'Otto Veniusstraat 30, 2000 Antwerpen';

        var service = new google.maps.DistanceMatrixService();

        service.getDistanceMatrix({
            origins: [ origin ],
            destinations: [ destination ],
            travelMode: google.maps.TravelMode.DRIVING,
            unitSystem: google.maps.UnitSystem.METRIC,
            drivingOptions: {
                departureTime: new Date(Date.now()),
                trafficModel: 'bestguess'
            }
        }, (response, status) => {
            this.setState({ mapsData: response.rows[0].elements })
        });
    }

    toggleSwitch = () => {
        this.isEnabled  = !this.isEnabled;
        this.setFirebaseEnabledStatus()
    }

    renderSwitch = () => {
        if (this.apiLoaded) return <SwitchButton onClick={ this.toggleSwitch } defaultOn={ this.isEnabled }/>
        return <BounceLoader loading={ true } size={ 28 } color={ '#72BFA5' } />
    }
    
    render = () => {
        return (
            <div className='GoogleMapsSection'>
                <div className='titleSection'>
                    <div>
                        <img src="/images/icons/travel.png" alt="Google calendar icon."/>
                        <SmallSectionTitle title='Tijdsafstand berkenen'/>
                    </div>

                    { this.renderSwitch() }
                </div>

                <Paragraph>
                    Door dit in te schakelen zal je Snoozy de tijd berekenen die er nodig is om 
                    je te verplaatsen van jou thuis naar het werk.
                </Paragraph>
            </div>
        )
    }
}

export default GoogleMapsSection;