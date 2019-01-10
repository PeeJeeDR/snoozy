// GLOBALS
const express       = require('express');
const app           = express();
const cors          = require('cors');
const bodyParser    = require('body-parser');
const pigpio        = require('pigpio');
pigpio.configureSocketPort(8889);
const Gpio          = pigpio.Gpio;
const cmd           = require('node-cmd');
const Gpio_1        = require('onoff').Gpio;

// SETTINGS
const port      = process.env.PORT || 8081;
const RES_POWER     = 'POWER_OFF';
const RES_SNOOZE    = 'SNOOZE';

// SOUNDS
let sound_played    = false;
let sound_length;

// VARIABLES
let interval            = null;
let seconds_interval    = null;
let ambiLightInterval   = null;
let duty_cycle          = 0;
let ambi_duty_cycle     = 0;
let ambi_is_off         = false;
let was_on_max          = false;
let seconds_counter     = 0;

let power_button_pressed    = false;
let snooze_button_pressed   = false;

// LEDS
const led_white     = new Gpio(0, { mode: Gpio.OUTPUT }); 
const led_blue      = new Gpio(5, { mode: Gpio.OUTPUT }); 
const led_green     = new Gpio(6, { mode: Gpio.OUTPUT }); 
const led_red       = new Gpio(1, { mode: Gpio.OUTPUT }); 

// BUTTONS
const power_button      = new Gpio_1(20, 'in', 'both');
const snooze_button     = new Gpio_1(21, 'in', 'both');

// CONFIGS
app.use(cors());
app.options('*', cors());

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// FUNCTIONS
watchButtons = () => {
    power_button.watch((err, value) => {
        if (err) console.log(err);

        power_button_pressed    = true;
    });

    snooze_button.watch((err, value) => {
        if (err) console.log(err);

        snooze_button_pressed    = true;
    });
}

setSoundLength = (sound) => {
    cmd.get('mp3info -p "%S" assets/' + sound + '.mp3', (err, data, stderr) => {
        sound_length    = data;
    });
}
 
alarmSound = (sound) => {
    if (!sound_played)
    {
        cmd.run('omxplayer -o alsa assets/' + sound + '.mp3');
        
        seconds_counter     = 0;
        sound_played        = true;
    }
}

shutdownAlarm = (res, value) => {
    console.log(value);

    // SHUT LIGHTS
    led_red.pwmWrite(0);
    led_green.pwmWrite(0);
    led_blue.pwmWrite(0);
    led_white.pwmWrite(0);

    // CLEAR INTERVALS
    clearInterval(seconds_interval);
    clearInterval(interval);

    // RESET VARIABLES
    duty_cycle  = 0;
    was_on_max  = false;
    seconds_counter         = 0;
    power_button_pressed    = false;
    snooze_button_pressed   = false;
    sound_played            = false;
    // SHUT SOUND
    cmd.run('sudo pkill omxplayer');

    // SEND RESPONSE
    if (res !== false) res.send(value)
}

dutyCycle = () => {
    if (!was_on_max)
    {
        duty_cycle += 5;

        if (duty_cycle > 250)
        {
            duty_cycle  = 255;
            was_on_max  = true;
        }
    }

    if (was_on_max)
    {
        duty_cycle -= 5;

        if (duty_cycle < 1)
        {   
            duty_cycle  = 0;
            was_on_max  = false;
        }
    }
}

ambiDutyCycle = () => {
    ambi_duty_cycle += 5;

    if (ambi_duty_cycle > 250)
    {
        ambi_duty_cycle  = 255;
    }
}

// ROUTES
app.post('/blink', (req, res) => {
    // SET SOUND PLAYED TO FALSE
    sound_played            = false;
    power_button_pressed    = false;
    snooze_button_pressed   = false;
    ambi_duty_cycle         = 0;

    // KEEP WATCHING BUTTONS;
    watchButtons();

    console.log(req.body.sound);
    console.log(req.body.audio);

    clearInterval(ambiLightInterval);

    led_white.digitalWrite(0);                             
    led_green.digitalWrite(0);               
    led_blue.digitalWrite(0); 
    led_red.digitalWrite(0);

    // CHECK IF SOUND MUST BE PLAYED
    if (req.body.audio == 'true')
    {
        console.log('AUDIO ENABLED');
        setSoundLength(req.body.sound)
        alarmSound(req.body.sound);
    }

    // GLOBAL INTERVAL
    interval   = setInterval((led) => {
        switch (led)
        {
            case 'red':
                led_red.pwmWrite(duty_cycle);
                break;
    
            case 'blue':
                led_blue.pwmWrite(duty_cycle);
                break;
    
            case 'green':
                led_green.pwmWrite(duty_cycle);
                break;
    
            case 'white':
                led_white.pwmWrite(duty_cycle);               
                break;

            case 'off':
                led_white.pwmWrite(0);               
                led_red.pwmWrite(0);               
                led_green.pwmWrite(0);               
                led_blue.pwmWrite(0);                             
                break;
        };

        // LIGHT LEDS
        dutyCycle();

        // CHECK WHICH BUTTON IS PRESSED
        if (power_button_pressed)
        {
            shutdownAlarm(res, RES_POWER);
        }

        if (snooze_button_pressed)
        {
            shutdownAlarm(res, RES_SNOOZE);
        }
    }, 50, req.body.led_color);

    // SECONDS INTERVAL
    seconds_interval    = setInterval(() => {
        console.log(sound_length);
        console.log(seconds_counter);

        if (parseInt(seconds_counter) === 50) 
        {
            shutdownAlarm(res, RES_SNOOZE);
        }

        seconds_counter++;
    }, 1000)
});

app.post('/ambi-light', (req, res) => {
    ambi_duty_cycle     = 0;

    led_white.digitalWrite(0);                             
    led_green.digitalWrite(0);               
    led_blue.digitalWrite(0); 
    led_red.digitalWrite(0);

    clearInterval(ambiLightInterval);

    ambiLightInterval   = setInterval((led) => {
        switch (req.body.led_color)
        {
            case 'red':
                led_red.pwmWrite(ambi_duty_cycle);
                break;
    
            case 'blue':
                led_blue.pwmWrite(ambi_duty_cycle);
                break;
    
            case 'green':
                led_green.pwmWrite(ambi_duty_cycle);
                break;
    
            case 'white':
                led_white.pwmWrite(ambi_duty_cycle); 
                break;

            case 'off':
                led_white.pwmWrite(0);               
                led_red.pwmWrite(0);               
                led_green.pwmWrite(0);               
                led_blue.pwmWrite(0);                             
                break;
        }   
    
        ambiDutyCycle();

        }, 50, req.body.led_color);

    res.send('LIGHTS_ON');
})

app.post('/light-off', (req, res) => {
    shutdownAlarm(res, RES_POWER);
});

app.post('/ambi-light-off', (req, res) => {
    clearInterval(ambiLightInterval); 

    ambi_duty_cycle     = 0;

    led_white.digitalWrite(0);                             
    led_green.digitalWrite(0);               
    led_blue.digitalWrite(0); 
    led_red.digitalWrite(0);
})

process.on('SIGINT', () => {
    shutdownAlarm(false, 'POWER_OFF')
    process.exit();
})

app.listen(port, () => console.log('Listening on port ', port));

// FAST BLINKING LED
/* setInterval(() => {
    led_red.digitalWrite(led_red.digitalRead() ^ 1);
}, 100); */