import { db } from '../../firebase/firebase';
import axios from 'axios';

const snoozyRef     = db.collection('snoozy').doc('settings');

const AmbiLightHandler = () => {
    snoozyRef.onSnapshot(snap => {
        const color     = snap.data().always_on_color;
        turnOnAmbiLight(color);
    });
}

const turnOnAmbiLight = async (color) => {
    const res   = await axios.post('http://192.168.43.196:8081/ambi-light', { 
        led_color: color,
    });

    console.log(res.data);
}

export default AmbiLightHandler;