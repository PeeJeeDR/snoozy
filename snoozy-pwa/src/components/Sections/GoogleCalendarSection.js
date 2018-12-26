import React from 'react';
import SmallSectionTitle from '../Titles/SmallSectionTitle';
import Paragraph from '../Paragraphs/Paragraph';
// import SwitchButton from '../Buttons/SwitchButton';
import * as CalendarConfig from '../../config/CalendarConfig';
import Switch from 'react-switch';

let gapi  = window.gapi;

class GoogleCalendarSection extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            toggleIsOn: false,
            apiLoaded: false,
        };
    }

    componentDidMount = () => {
        this.handleClientLoad();
    }

    handleAuthClick = () => {
        gapi.auth2.getAuthInstance().signIn();
    }

    handleSignoutClick = () => {
        gapi.auth2.getAuthInstance().signOut();
    }

    handleClientLoad = () => {
        gapi.load('client:auth2', this.initClient);
    }

    initClient = () => {
        gapi.client.init({
            apiKey: CalendarConfig.API_KEY,
            discoveryDocs: CalendarConfig.DISCOVERY_DOCS,
            clientId: CalendarConfig.CLIENT_ID,
            scope: CalendarConfig.SCOPES
        }).then(() => {
            gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);
            this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        }).catch(err => {
            console.log(err);
        })

        
    }

    updateSigninStatus = (isSignedIn) => {
        console.log('Signed: ', isSignedIn);
        this.setState({ apiLoaded: true })

        if (isSignedIn)
        {
            this.setState({ toggleIsOn: true })
            this.listUpcomingEvents();
        } 

        if (this.state.apiLoaded && !this.state.toggleIsOn)
        {
            this.handleSignoutClick();
        }
    }

    listUpcomingEvents = () => {
        gapi.client.calendar.events.list({
            'calendarId': 'primary',
            'timeMin': (new Date()).toISOString(),
            'showDeleted': false,
            'singleEvents': true,
            'maxResults': 10,
            'orderBy': 'startTime'
        }).then(res => {
            let events  = res.result.items;
            console.log(events);
        })
    }

    toggleSwitch = () => {
        this.setState({ toggleIsOn: !this.state.toggleIsOn })
    }

    checkLoginAfterToggle = () => {
        if (this.state.apiLoaded)
        {
            if (this.state.toggleIsOn)
            {
                this.handleAuthClick();
            }

            if (!this.state.toggleIsOn)
            {
                this.handleSignoutClick();
            }
        }
    }
    
    render = () => {
        this.checkLoginAfterToggle();
        
        return (
            <div className='GoogleCalendarSection'>
                <div className='titleSection'>
                    <div>
                        <img src="/images/icons/calendar.png" alt="Google calendar icon."/>
                        <SmallSectionTitle title='Google Calendar'/>
                    </div>

                    {/* <SwitchButton onClick={ this.toggleClick } defaultOn={ this.state.toggleIsOn }/> */}

                    <Switch
                        onChange={ this.toggleSwitch }
                        checked={ this.state.toggleIsOn }
                        id="normal-switch"
                        onColor='#72BFA5'
                        uncheckedIcon={ false }
                        checkedIcon={ false }
                    />
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