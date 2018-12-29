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
        this.state = {
            apiLoaded: false,
            destination: '',
            start_date: '',
            start_time: '',
        }

        this.isEnabled  = false;
    }

    componentWillMount = () => {
        this.getCalendarData();
        this.getFirebaseEnabledStatus();
    }

    getCalendarData = () => {
        db.collection('api-data').doc('calendar-data').get()
            .then(res => {
                this.setState({ 
                    destination: res.data().location,
                    start_date: res.data().start_date,
                    start_time: res.data().start_time,
                })
            })
    }

    getFirebaseEnabledStatus = () => {
        db.collection('api-data').doc('maps-data').get()
            .then(res => {
                this.isEnabled  = res.data().enabled;
                
                this.setState({ apiLoaded: true });

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

        if (this.isEnabled) this.collectMapsData();
    }

    collectMapsData = () => {
        var origin          = 'Heilaar 16, 2370 Arendonk';
        var destination     = this.state.destination;

        var service = new google.maps.DistanceMatrixService();

        console.log(this.state.start_date);
        console.log(new Date(this.state.start_date + 'T' + this.state.start_time + 'Z'));

        service.getDistanceMatrix({
            origins: [ origin ],
            destinations: [ destination ],
            travelMode: google.maps.TravelMode.DRIVING,
            unitSystem: google.maps.UnitSystem.METRIC,
            drivingOptions: {
                departureTime: new Date(Date.now()), // Deze moet aangepast worden naar de start van de calendar
                trafficModel: 'bestguess'
            }
        }, (response, status) => {
            db.collection('api-data').doc('maps-data').set({
                enabled: true,
                distance: response.rows[0].elements[0].distance.text,
                duration: response.rows[0].elements[0].duration.text,
                duration_in_traffic: response.rows[0].elements[0].duration_in_traffic.text,
            });
        });
    }

    toggleSwitch = () => {
        this.isEnabled  = !this.isEnabled;
        this.setFirebaseEnabledStatus();
    }

    renderSwitch = () => {
        if (this.state.apiLoaded) return <SwitchButton onClick={ this.toggleSwitch } defaultOn={ this.isEnabled }/>
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