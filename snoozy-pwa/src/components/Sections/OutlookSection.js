/*
https://docs.microsoft.com/en-us/outlook/rest/get-started

https://outlook.office.com/api/v2.0/me/messages?$count=true



https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=b4e1595e-1d54-41d5-b555-6b29fc486f1e&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fexternal-apps&response_type=code&scope=openid+Mail.Read

http://localhost:3000/external-apps?code=Mc763cf92-fecf-31ec-4633-f30c082ac480

http://localhost:3000/external-apps?code=Mc763cf92-fecf-31ec-4633-f30c082ac480&session_state=7B29111D-C220-4263-99AB-6F6E135D75EF&state=D79E5777-702E-4260-9A62-37F75FF22CCE


*/

import React from 'react';
import queryString from 'query-string';
import SmallSectionTitle from '../Titles/SmallSectionTitle';
import Paragraph from '../Paragraphs/Paragraph';
import SwitchButton from '../Buttons/SwitchButton';
import { BounceLoader } from 'react-spinners';
import { db } from '../../firebase/firebase';


const app_id = 'b4e1595e-1d54-41d5-b555-6b29fc486f1e';


class OutlookSection extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            apiLoaded: false,
            tokenIsSet: false,
        };

        this.enabledOnFirebase  = false;
        this.dbRef  = db.collection('notifications').doc('atQokNFZjWS24Qw2PD8Q');
        this.token  = '';
    }

    componentWillMount = () => {
    	this.dbRef.get()
    		.then(res => {
    			this.enabledOnFirebase  = res.data().enabled;
    			this.checkEnabledStatus();
    		})
    		.catch(err => {
    			console.log(err);
    		})
    	}

	checkEnabledStatus = () => {
		let parsed  = queryString.parse(window.location.search);
        let token   = parsed.access_token;

        this.setState({ apiLoaded: true })
    }

    toggleSwitch = () => {
    	if (!this.state.tokenIsSet)
    	{
    		this.dbRef.update({
    			enabled: true,
    			auth_token: '',
    		}).then(() => window.location     = 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=' + app_id + '&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fexternal-apps&response_type=code&scope=openid+Mail.Read')
        
        }
        else
        {
        	this.dbRef.update({
        		enabled: false,
        		auth_token: null
        	}).then(() => window.location.replace(window.location.pathname))
        }
    }

    renderSwitch = () => {
        if (this.state.apiLoaded)
        {
            return <SwitchButton onClick={ this.toggleSwitch } defaultOn={ this.state.tokenIsSet }/>
        }
        else 
        {
            return <BounceLoader loading={ true } size={ 28 } color={ '#72BFA5' }/>
        }
    }
    
    render = () => {
        return (
            <div className='SpotifySection'>
                <div className='titleSection'>
                    <div>
                        <img src="/images/icons/mail.png" alt="Email icon."/>
                        <SmallSectionTitle title='Outlook'/>
                    </div>

                    { this.renderSwitch() }
                </div>

                <Paragraph>
                	Laat het aantal ongelezen emails zien op je eigen Snoozy!           
                </Paragraph>
            </div>
        )
    }
}

export default OutlookSection;