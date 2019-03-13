import { startAsyncAction, finishAsyncAction } from '../async/asyncActions.jsx'
import cuid from 'cuid'

export const updateProfile = (user) => 
    async (
        dispatch,
        getState,
        {getFirebase},
    ) => {
        const firebase = getFirebase()
        const currentUser = firebase.auth().currentUser
        try {
            await firebase.updateProfile(user)
            await currentUser.updateProfile({
                displayName: user.displayName
            })     
        } catch(error) {
            throw new Error('Failed to Update the Profile.')
        }
    }

export const setNewProfilePicture = (file) => 
async (
    dispatch,
    getState,
    {getFirebase, getFirestore}
) => {
    const firebase = getFirebase()
    const firestore = getFirestore()
    const currentUser = firebase.auth().currentUser
    const storagePath = `${currentUser.uid}/profile_pictures`
    const imgId = cuid()
    const fileOpts = {name: imgId}
    try {
        dispatch(startAsyncAction())        
        let uploadedFile = await firebase.uploadFile(storagePath, file, null, fileOpts)
        let downloadURL = await uploadedFile.uploadTaskSnapshot.ref.getDownloadURL()
        let userDoc = await firestore.get(`users/${currentUser.uid}`)
        await firebase.updateProfile({avatarUrl: downloadURL})
        await currentUser.updateProfile({photoURL: downloadURL})
        await firestore.add(
            {
                collection: 'users',
                doc: currentUser.uid,
                subcollections: [{collection: 'profile_pictures'}]
            },
            {
                downloadURL: downloadURL,
                uploadedAt: firestore.FieldValue.serverTimestamp(),
                imgId: imgId,
            }
        )
    } catch (error) {
        throw new Error('Failed to Upload the Image.')
    } finally {
        dispatch(finishAsyncAction())        
    }
}
