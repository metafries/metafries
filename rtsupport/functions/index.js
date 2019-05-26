const functions = require('firebase-functions');
const admin = require('firebase-admin')

admin.initializeApp(functions.config().firebase)

const newActivity = (type, target, data) => {
    return {
        type,
        eventId: target,        
        eventStartDate: data.startDate,
        eventEndDate: data.endDate,
        hostedBy: data.hostedBy,
        title: data.title,
        hostAvatarUrl: data.hostAvatarUrl,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        hostUid: data.hostUid,
        status: data.status,
    }
}

// Listen for updates to any `event` document.
exports.updateStatus = functions.firestore
    .document('events/{eventId}')
    .onUpdate((change, context) => {
        // Retrieve the current and previous value
        const events_fs = change.after.data();
        const prevEvents_fs = change.before.data();
        console.log({events_fs})
        console.log({prevEvents_fs})

        // Only update if the status has changed
        if (events_fs.status === prevEvents_fs.status) return null

        console.log({context})        
        const activity_fs = newActivity(
            'UPDATE_STATUS', context.params.eventId, events_fs,
        )
        console.log({activity_fs})

        return admin
            .firestore()
            .collection('activity')
            .add(activity_fs)
            .then((docRef) => {
                return console.log('Activity created with ID: ', docRef.id)
            })
            .catch((err) => {
                return console.log('Error adding activity: ', err)
            })        
    })

exports.createEvent = functions.firestore
    .document('events/{eventId}')
    .onCreate(e => {
        const events_fs = e.data()
        console.log({events_fs})
        const activity_fs = newActivity(
            'CREATE_EVENT', e.id, events_fs,
        )
        console.log({activity_fs})
        return admin
            .firestore()
            .collection('activity')
            .add(activity_fs)
            .then((docRef) => {
                return console.log('Activity created with ID: ', docRef.id)
            })
            .catch((err) => {
                return console.log('Error adding activity: ', err)
            })
    })