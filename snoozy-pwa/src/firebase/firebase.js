import config from './firebase_config';

const config = {
    apiKey: config.API_KEY,
    authDomain: config.DOMAIN,
    databaseURL: config.DATABASE_URL,
    projectId: config.PROJECT_ID,
    storageBucket: config.STORAGE_BUCKET,
    messagingSenderId: config.MESSAGING_SENDER_ID
};

firebase.initializeApp(config);