import { db } from '../../firebase/firebase';
import * as ApiConfig from '../../config/ApiConfig';
import axios from 'axios';

const snoozyRef         = db.collection('snoozy').doc('status');

const LocationHandler = () => {
    getOrigin();
}

const getOrigin = () => {
    if ('geolocation' in navigator)
    {
        navigator.geolocation.getCurrentPosition(res => {
            const lat   = res.coords.latitude;
            const long  = res.coords.longitude;

            getAddress(lat, long);
        }, err => {
            console.log(err);
        })
    }
    else 
    {
        console.log('Geolocation is not enabled. Switching to IP location...');
        getOriginWithIp();
    }
}

const getOriginWithIp = () => {
    axios.get('http://ip-api.com/json').then(res => {
        getAddress(res.data.lat, res.data.lon)
    }, err => {
        console.log('Something went wrong...', err);
    })
}

const getAddress = (lat, long) => {
    const url   = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + long + '&key=' + ApiConfig.GOOGLE_MAP_KEY;

    axios.get(url).then(res => {
        snoozyRef.update({
            location: res.data.results[0].formatted_address,
        })
    }, err => {
        console.log('Something went wrong...', err);
    })
}

export default LocationHandler;