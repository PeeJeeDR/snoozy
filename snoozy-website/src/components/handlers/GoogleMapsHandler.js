import { db } from '../../firebase/firebase';

const google  			= window.google;
const calendarRef       = db.collection('api-data').doc('calendar-data');
const mapsRef           = db.collection('api-data').doc('maps-data');

const GoogleMapsHandler = () => {
    getCalendarDate();
}

const getCalendarDate = () => {
    calendarRef.onSnapshot(snap => {
        const result        = snap.data();
        const location      = result.location;
        const start_date    = new Date(result.start_date + 'T' + result.start_time + '');

        calculateTraffic(location, start_date)
    }); 
}

const calculateTraffic = (location, start_date) => {
    const origin                = 'Flierenbos 20, 2370 Arendonk';
    // const origin                = 'Yaroslavl';
    // const origin                = 'Berlijn';
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
            const origin                = res.originAddresses[0];
            const destination           = res.destinationAddresses[0];
            const arrival_date          = start_date;
            const duration              = res.rows[0].elements[0].duration.text;
            const duration_in_traffic   = res.rows[0].elements[0].duration_in_traffic.text;
            const traffic_data          = duration_in_traffic.split(' ');
            const distance              = res.rows[0].elements[0].distance.text;
    
            let traffic_days        = 0;
            let traffic_hours       = 0;
            let traffic_minutes     = 0;
            let date_changed        = false;

            const departure_date        = new Date();

            if (traffic_data.length === 4 && traffic_data.indexOf('day') > -1 && traffic_data.indexOf('hours') > -1 && traffic_data.indexOf('mins') === -1)
            {
                traffic_days        = parseInt(traffic_data[0]);
                traffic_hours       = parseInt(traffic_data[2]);
                traffic_minutes     = arrival_date.getMinutes();

                departure_date.setUTCDate(arrival_date.getUTCDate() - traffic_days);
                departure_date.setUTCHours(arrival_date.getUTCHours() - traffic_hours);
                departure_date.setUTCMinutes(arrival_date.getUTCMinutes() - traffic_minutes);

                date_changed    = true;
            }
            else if (traffic_data.length === 4 && traffic_data.indexOf('day') === -1 && traffic_data.indexOf('hours') > -1 && traffic_data.indexOf('mins') > -1)
            {
                traffic_days        = arrival_date.getMinutes();
                traffic_hours       = parseInt(traffic_data[0]);
                traffic_minutes     = parseInt(traffic_data[2]);

                departure_date.setUTCDate(arrival_date.getUTCDate() - traffic_days);
                departure_date.setUTCHours(arrival_date.getUTCHours() - traffic_hours);
                departure_date.setUTCMinutes(arrival_date.getUTCMinutes() - traffic_minutes);

                date_changed    = true;
            }
            else if (traffic_data.length === 2)
            {
                traffic_days        = arrival_date.getUTCDate();
                traffic_hours       = arrival_date.getUTCHours();
                traffic_minutes     = parseInt(traffic_data[0]);

                departure_date.setMinutes(arrival_date.getMinutes() - traffic_minutes);

                date_changed    = true;
            }
            else 
            {
                traffic_days        = arrival_date.getDate();
                traffic_hours       = arrival_date.getHours();
                traffic_minutes     = arrival_date.getMinutes();

                date_changed    = true;
            }
            
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