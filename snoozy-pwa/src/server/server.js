const express   = require('express');
const app       = express();
const port      = 8081;
const distance  = require('google-distance-matrix');

distance.key('AIzaSyDe2RQwYRxTmKXBFkr6d9oQqNOrT9K95hg');
/* const cors      = require('cors');

app.use(cors);
app.options('*', cors()); */

app.get('/distance', (req, res) => {
    distance.mode('driving');
    // distance.arrival_time(1546581600);
    distance.departure_time('now');
    distance.traffic_model('best_guess');

    var origins         = ['FLierenbos 20, 2370 Arendonk'];
    var destinations    = ['Otto Veniusstraat 30, 2000 Antwerpen'];

    distance.matrix(origins, destinations, (err, distances) => {
        if (!err)
            res.send(distances)
    })

    
});

app.listen(port, () => { console.log('Live on port ', port) })