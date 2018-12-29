import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/firestore';
import firebase_config from './firebase_config';

const config = {
    apiKey: firebase_config.API_KEY,
    authDomain: firebase_config.DOMAIN,
    databaseURL: firebase_config.DATABASE_URL,
    projectId: firebase_config.PROJECT_ID,
    storageBucket: firebase_config.STORAGE_BUCKET,
    messagingSenderId: firebase_config.MESSAGING_SENDER_ID
};

const app   = firebase.initializeApp(config);
const db    = app.firestore();
db.settings({
    timestampsInSnapshots: true
});

export { app, db };