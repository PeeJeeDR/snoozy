import React from 'react';
import queryString from 'query-string';
import axios from 'axios';

class SpotifySection extends React.Component {
    componentDidMount = () => {
        let parsed  = queryString.parse(window.location.search);
        console.log(parsed);

        /* axios.get('https://api.spotify.com/v1/me', {
            params: {
                Authorization: `Bearer ${ token }`
            }
        }) */

        /* fetch('https://api.spotify.com/v1/me', {
            headers: { 'Authorization': 'Bearer ' + token }
        })
            .then(res => res.json())
            .then(res => console.log(res)) */
    }
    
    render = () => {
        return (
            <div className='SpotifySection'>
                <button 
                    onClick={ () => window.location = 'http://localhost:8080/login' } 
                    style={{ backgroundColor: 'lightgreen', border: 'none', padding: 10, color: '#fff', margin: 10 }}
                >
                    Login to Spotify
                </button>
            </div>
        )
    }
}

export default SpotifySection;