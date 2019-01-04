import React from 'react';
import queryString from 'query-string';
import SmallSectionTitle from '../Titles/SmallSectionTitle';
import Paragraph from '../Paragraphs/Paragraph';
import SwitchButton from '../Buttons/SwitchButton';
import { BounceLoader } from 'react-spinners';
import { db } from '../../firebase/firebase';


class TwitterSection extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            apiLoaded: false,
            tokenIsSet: false,
        };

        this.enabledOnFirebase  = false;
        this.dbRef  = db.collection('notifications').doc('2FLZNWvrvDddi4dcxlt2a55');
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
    		})/*.then(() => window.location     = '')*/

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
                        <img src="/images/icons/twitter.png" alt="Email icon."/>
                        <SmallSectionTitle title='Twitter'/>
                    </div>

                    { this.renderSwitch() }
                </div>

                <Paragraph>
                	Laat het aantal Twitter notifications zien op je eigen Snoozy!           
                </Paragraph>
            </div>
        )
    }
}

export default TwitterSection;