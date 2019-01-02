import { db } from '../../firebase/firebase';
import * as ApiConfig from '../../config/ApiConfig';

const gapi  = window.gapi;
const calendarRef   = db.collection('api-data').doc('calendar-data');
const snoozyRef     = db.collection('snoozy').doc('status');

const GoogleCalendarHandler = () => {
    handleClientLoad();
}

const handleClientLoad = () => {
    gapi.load('client:auth2', initClient);
}

const initClient = () => {
    gapi.client.init({
        apiKey: ApiConfig.API_KEY,
        discoveryDocs: ApiConfig.DISCOVERY_DOCS,
        clientId: ApiConfig.CLIENT_ID,
        scope: ApiConfig.SCOPES
    }).then(() => {
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    }).catch(err => {
        console.log(err);
    })
}

const updateSigninStatus = () => {
    snoozyRef.onSnapshot(snap => {
        if (snap.data().calendar_enabled)
        {
            listUpcomingEvents(snap.data())
        }
    }, err => {
        console.log('Something went wrong...', err);
    })
}

const listUpcomingEvents = () => {
    gapi.client.calendar.events.list({
        'calendarId': 'primary',
        'timeMin': (new Date()).toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': 10,
        'orderBy': 'startTime'
    }).then(res => {
        let events  = res.result.items;
        saveToFirebase(events)
    })
}

const saveToFirebase = (events) => {
    const firstEvent    = events[0];

    const eventData     = {
        title: firstEvent.summary,
        location: firstEvent.location,
        start_time: firstEvent.start.dateTime.split('T')[1].split('+')[0].slice(0, -3),
        start_date: firstEvent.start.dateTime.split('T')[0],
        end_time: firstEvent.end.dateTime.split('T')[1].split('+')[0].slice(0, -3),
        end_date: firstEvent.end.dateTime.split('T')[0],
        login_status: true
    }

    calendarRef.set(eventData).then(res => {
        return;
    }, err => {
        console.log('Something went wrong...', err);
    })
}

export default GoogleCalendarHandler;