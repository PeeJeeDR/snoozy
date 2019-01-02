const express   = require('express');
const app       = express();
const port      = process.env.PORT || 8080;

const Gpio      = require('onoff').Gpio;
const led       = new Gpio(4, 'out');

app.get('/hello', (req, res) => {
    res.send('hello');
})

app.listen(port, () => console.log('Listening on port ', port));