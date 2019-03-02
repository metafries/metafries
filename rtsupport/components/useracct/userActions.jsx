import { startAsyncAction, finishAsyncAction } from '../async/asyncActions.jsx'

export const setNewProfilePicture = (file, fileName) => 
async (
    dispatch,
    getState,
    {getFirebase, getFirestore}
) => {
    const firebase = getFirebase()
    const firestore = getFirestore()
    const currentUser = firebase.auth().currentUser
    const storagePath = `${currentUser.uid}/images`
    const fileOpts = {name: fileName}
    dispatch(startAsyncAction())
    try {
        let uploadedFile = await firebase.uploadFile(storagePath, file, null, fileOpts)
        let downloadURL = await uploadedFile.uploadTaskSnapshot.ref.getDownloadURL()
        let userDoc = await firestore.get(`users/${currentUser.uid}`)
        await firebase.updateProfile({avatarUrl: downloadURL})
        await currentUser.updateProfile({photoURL: downloadURL})
        await firestore.add(
            {
                collection: 'users',
                doc: currentUser.uid,
                subcollections: [{collection: 'photos'}]
            },
            {
                downloadURL: downloadURL,
                uploadedAt: firestore.FieldValue.serverTimestamp(),
                fileName: fileName,
            }
        )
    } catch (error) {
        throw new Error('ERR_UPLOAD_IMAGE_FAILED')
    } finally {
        dispatch(finishAsyncAction())        
    }
}