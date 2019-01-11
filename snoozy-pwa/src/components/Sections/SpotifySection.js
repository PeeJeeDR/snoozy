import React from 'react';
import queryString from 'query-string';
import SmallSectionTitle from '../Titles/SmallSectionTitle';
import Paragraph from '../Paragraphs/Paragraph';
import SwitchButton from '../Buttons/SwitchButton';
import { BounceLoader } from 'react-spinners';
import { db } from '../../firebase/firebase';

class SpotifySection extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            apiLoaded: false,
            tokenIsSet: false,
        };

        this.enabledOnFirebase  = false;
        this.dbRef  = db.collection('api-data').doc('spotify-data');
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

        if (token === undefined)
        {
            this.setState({ tokenIsSet: false });

            if (this.enabledOnFirebase)
            {
                //window.location     = 'http://localhost:8080/login';
            }
        }
        else 
        {
            if (!this.enabledOnFirebase)
            {
                this.setState({ tokenIsSet: false });
            }
            else 
            {
                this.setState({ tokenIsSet: true });
                
                this.dbRef.update({
                    enabled: true,
                    auth_token: token
                })
            }
        }

        this.setState({ apiLoaded: true })
    }

    toggleSwitch = () => {
        if (!this.state.tokenIsSet)
        {
            this.dbRef.update({
                enabled: true,
                auth_token: '',
            }).then(() => window.location     = 'http://localhost:8080/login')
            
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
                        <img src="/images/icons/spotify.png" alt="Spotify icon."/>
                        <SmallSectionTitle title='Spotify'/>
                    </div>

                    { this.renderSwitch() }
                </div>

                <Paragraph>
                    Laat je s'ochtends wakker maken door een willekeurig liedje uit 
                    je spotify lijst! Leuk wakker worden toch?
                </Paragraph>
            </div>
        )
    }
}

export default SpotifySection;