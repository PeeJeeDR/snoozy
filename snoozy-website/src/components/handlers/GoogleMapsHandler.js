import { db } from '../../firebase/firebase';

const google  			= window.google;
const calendarRef       = db.collection('api-data').doc('calendar-data');
const mapsRef           = db.collection('api-data').doc('maps-data');
const snoozyRef         = db.collection('snoozy').doc('status');

const GoogleMapsHandler = () => {
    getSnoozyLocation();
}

const getSnoozyLocation = () => {
    snoozyRef.onSnapshot(snap => {
        getCalendarDate(snap.data().location)
    }, err => {
        console.log('Something went wrong...', err);
    });
}

const getCalendarDate = (snoozy_location) => {
    calendarRef.onSnapshot(snap => {
        const result                = snap.data();
        const location              = result.location;
        const start_date_seconds    = result.start_date.seconds;
        const start_date            = new Date(0);

        start_date.setSeconds(start_date_seconds);

        calculateTraffic(location, start_date, snoozy_location)
    }, err => {
        console.log('Something went wrong...', err);
    }); 
}

const calculateTraffic = (location, start_date, snoozy_location) => {
    const origin                = snoozy_location;
    const service               = new google.maps.DistanceMatrixService();

    service.getDistanceMatrix({
        origins: [ origin ],
        destinations: [ location ],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
        drivingOptions: {
            departureTime: start_date,
            trafficModel: 'bestguess'
        }
    }, (res, status) => {
        if (res.rows[0].elements[0].status !== 'ZERO_RESULTS')
        {
            const origin                = 'Flierenbos 20, 2370 Arendonk';
            // const destination           = res.destinationAddresses[0];
            const destination           = res.destinationAddresses[0];
            const arrival_date          = start_date;
            const duration              = res.rows[0].elements[0].duration.text;
            const duration_in_traffic   = res.rows[0].elements[0].duration_in_traffic.text;
            const traffic_data          = duration_in_traffic.split(' ');
            const distance              = res.rows[0].elements[0].distance.text;
            const departure_date        = new Date(0);
    
            let date_changed    = false;
            let total_seconds   = 0;

            if (traffic_data.length === 4 && traffic_data.indexOf('day') > -1 && traffic_data.indexOf('hours') > -1)
            {
                total_seconds   = (arrival_date.getTime() / 1000) - ((Math.floor(parseInt(traffic_data[0]) * 86400)) + (Math.floor(parseInt(traffic_data[2]) * 3600)));
                date_changed    = true;
            }
            
            if (traffic_data.length === 4 && traffic_data.indexOf('hours') > -1 && traffic_data.indexOf('mins') > -1)
            { 
                total_seconds   = (arrival_date.getTime() / 1000) - ((Math.floor(parseInt(traffic_data[0]) * 3600)) + (Math.floor(parseInt(traffic_data[2]) * 60)));
                date_changed    = true;
            }
            
            if (traffic_data.length === 2)
            {
                total_seconds   = (arrival_date.getTime() / 1000) - (Math.floor(parseInt(traffic_data[0]) * 60));
                date_changed    = true;
            }

            departure_date.setSeconds(total_seconds);
            
            if (date_changed)
            {
                mapsRef.update({
                    origin,
                    destination,
                    arrival_date,
                    distance,
                    duration,
                    duration_in_traffic,
                    departure_date
                })
            }
        }
        else 
        {
            console.log('Error finding the selected place.');
        }
    })
}

export default GoogleMapsHandler;