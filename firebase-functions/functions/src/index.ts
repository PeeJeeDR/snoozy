import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();

export const getStatus = functions.https.onRequest((request, response) => {
    admin.firestore().collection('api-data').doc('maps-data').onSnapshot((res) => {
        response.send(res.data())
    })
});
