# Snoozy

Snoozy is a smart alarm clock that calculates at what time you should wake up, based on your appointments in Google Calendar, the travel time to the appointment, and the time you require.


<br><br>

## What is what?

<br>

#### firebase-functions
Firebase stuff, our choice of database.

#### gpio-server
This is a server running on the Raspberry Pi, mainly to detect and connect to the gpio pins on the Raspberry Pi board. These are used to control the ambilight and buttons (snooze/disable alarm).

#### Promotion-website
This is simply a site to promote this project, Snoozy.

#### Snoozy-pwa
This is the progressive web app (PWA) to set the settings of your snoozy.

#### Snoozy-website
This is a website that is displayed in fullscreen on the Raspberry Pi screen.

#### Spotify-server
This is a server running on the Raspberry Pi, unfortunatly Pi doesn't support spotify at the moment, so we'll have to do with a few default songs that are stored locally on the Pi.