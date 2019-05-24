const functions = require('firebase-functions');
const admin = require('firebase-admin')

admin.initializeApp(functions.config().firebase)

exports.createEvent = functions.firestore
    .document('events/{eventId}')
    .onCreate(event => {
        let newEvent = event.data()
        console.log('events: ', newEvent)
        const newActivity = {
            type: 'CREATE_EVENT',
            eventStartDate: newEvent.startDate,
            eventEndDate: newEvent.endDate,
            hostedBy: newEvent.hostedBy,
            title: newEvent.title,
            hostAvatarUrl: newEvent.hostAvatarUrl,
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
            hostUid: newEvent.hostUid,
            eventId: event.id,
        }
        console.log('activity: ', newActivity)
        return admin
            .firestore()
            .collection('activity')
            .add(newActivity)
            .then((docRef) => {
                return console.log('Activity created with ID: ', docRef.id)
            })
            .catch((err) => {
                return console.log('Error adding activity: ', err)
            })
    })