import { db } from '../../firebase/firebase';
import axios from 'axios';
import * as config from '../../config/IpConfig';

const snoozyRef     = db.collection('snoozy').doc('settings');

const AmbiLightHandler = () => {
    snoozyRef.onSnapshot(snap => {
        const color     = snap.data().always_on_color;
    });
}

const turnOnAmbiLight = async (color) => {
    const res   = await axios.post(`http://${ config.RASPBERRY_PI_IP }/ambi-light`, { 
        led_color: color,
    });

    console.log(res.data);
}

export default AmbiLightHandler;