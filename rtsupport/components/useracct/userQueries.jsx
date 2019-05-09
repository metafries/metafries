export const fetchPhotos = ({profileId}) => {
    return [
        {
            collection: 'users',
            doc: profileId,
            storeAs: 'profile'
        },
        {
            collection: 'users',
            doc: profileId,
            subcollections: [{collection: 'profile_pictures'}],
            storeAs: 'profile_pictures',         
        }
    ]
}
  