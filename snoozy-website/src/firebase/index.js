import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';
import * as firebase_config from './firebase_config';

const config = {
  apiKey: firebase_config.API_KEY,
  authDomain: firebase_config.DOMAIN,
  databaseURL: firebase_config.DATABASE,
  projectId: firebase_config.PROJECT_ID,
  storageBucket: firebase_config.STORAGE,
  messagingSenderId: firebase_config.MESSAGING
};

const app       = firebase.initializeApp(config);

const db  = app.database();
const storage   = app.storage();

export { storage, firebase, db };