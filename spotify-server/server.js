const express   = require('express');
const cors      = require('cors');
const app       = express();
const port      = 8080;
const request   = require('request');
const querystring   = require('querystring');
const config        = require('./SpotifyConfig');

app.use(cors());
app.options('*', cors());

const CLIENT_ID         = config.CLIENT_ID;
const CLIENT_SECRET     = config.CLIENT_SECRET;
const REDIRECT          = config.REDIRECT;

app.get('/login', (req, res) => {
    const scopes    = 'user-read-private user-read-email';

    const base_url      = 'https://accounts.spotify.com/authorize';
    const res_type      = '?response_type=code';
    const client_id     = '&client_id=' + CLIENT_ID;
    const scopes_url    =  scopes ? `&scope=${ encodeURIComponent(scopes) }` : '';
    const redirect      = '&redirect_uri=' + encodeURIComponent('http://localhost:8080/callback');

    const url   = base_url + res_type + client_id + scopes_url + redirect;

    res.redirect(url);
});

app.get('/callback', (req, res) => {
    const code      = req.query.code || null;

    const authOptions   = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
            code: code,
            redirect_uri: 'http://localhost:8080/callback',
            grant_type: 'authorization_code'
        },
        headers: {
            'Authorization': 'Basic ' + new Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')
        },
        json: true
    }

    request.post(authOptions, (error, response, body) => {
        if (response.statusCode === 200)
        {
            const access_token  = body.access_token;
            const refresh_token = body.refresh_token;

            res.redirect('http://localhost:3000/external-apps?' + querystring.stringify({
                access_token: access_token,
                refresh_token: refresh_token,
            }))
        }
        else 
        {
            res.redirect('http://localhost:3000/external-apps?' + querystring.stringify({
                error: error
            }))
        }
    })
})

app.listen(port, () => console.log(`Listening on port ${ port }`))