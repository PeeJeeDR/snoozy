import React from 'react';
import { BounceLoader } from 'react-spinners';
import SmallSectionTitle from '../Titles/SmallSectionTitle';
import Paragraph from '../Paragraphs/Paragraph';
import SwitchButton from '../Buttons/SwitchButton';
import * as ApiConfig from '../../config/ApiConfig';
import { db } from '../../firebase/firebase';

let gapi  = window.gapi;
const snoozyRef     = db.collection('snoozy').doc('status');

class GoogleCalendarSection extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            toggleIsOn: false,
            signedIn: false,
            apiLoaded: false,
        };
    }

    componentDidMount = () => {
        this.handleClientLoad();
    }

    handleAuthClick = () => {
        if (gapi.auth2.getAuthInstance().signIn())
        {
            snoozyRef.update({ calendar_enabled: true })
                .catch(err => console.log('Something went wrong...', err));
        }
    }

    handleSignoutClick = () => {
        if (gapi.auth2.getAuthInstance().signOut())
        {
            snoozyRef.update({ calendar_enabled: false })
                .catch(err => console.log('Something went wrong...', err));
        }
    }

    handleClientLoad = () => {
        gapi.load('client:auth2', this.initClient);
    }

    initClient = () => {
        gapi.client.init({
            apiKey: ApiConfig.API_KEY,
            discoveryDocs: ApiConfig.DISCOVERY_DOCS,
            clientId: ApiConfig.CLIENT_ID,
            scope: ApiConfig.SCOPES
        }).then(() => {
            gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);
            this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        }).catch(err => {
            console.log(err);
        })
    }

    updateSigninStatus = (isSignedIn) => {
        this.setState({ signedIn: isSignedIn, apiLoaded: true })
    }

    toggleSwitch = () => {
        if (this.state.signedIn)
        {
            this.setState({ signedIn: false })
            this.handleSignoutClick();
        }

        if (!this.state.signedIn)
        {
            this.setState({ signedIn: true })
            this.handleAuthClick();
        }
    }

    renderSwitch = () => {
        if (this.state.apiLoaded) 
        {
            return <SwitchButton onClick={ this.toggleSwitch } defaultOn={ this.state.signedIn }/>
        }
        
        return <BounceLoader loading={ true } size={ 28 } color={ '#72BFA5' }/>
    }
    
    render = () => {
        return (
            <div className='GoogleCalendarSection'>
                <div className='titleSection'>
                    <div>
                        <img src="/images/icons/calendar.png" alt="Google calendar icon."/>
                        <SmallSectionTitle title='Google Calendar'/>
                    </div>

                    { this.renderSwitch() }
                </div>

                <Paragraph>
                    Door Google Calendar in te schakelen kan Snoozy op basis van de locatie van je eerste afspraak bepalen
                    hoelaat je moet opstaan.
                </Paragraph>
            </div>
        )
    }
}

export default GoogleCalendarSection;