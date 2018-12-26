import React from 'react';
import SmallSectionTitle from '../Titles/SmallSectionTitle';
import Paragraph from '../Paragraphs/Paragraph';
import SwitchButton from '../Buttons/SwitchButton';

class GoogleCalendarSection extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            showAuthButton: false,
            dhowSignInButton: false
        };
    }

    handleAuthClick = () => {

    }
    
    render = () => {
        return (
            <div className='GoogleCalendarSection'>
                <div className='titleSection'>
                    <div>
                        <img src="/images/icons/calendar.png" alt="Google calendar icon."/>
                        <SmallSectionTitle title='Google Calendar'/>
                    </div>

                    <SwitchButton onClick={ this.openOnClick } defaultOn={ false }/>
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