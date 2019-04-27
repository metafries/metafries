export const fetchPhotos = ({fba, othersUid}) => {
    if (othersUid !== null) {
        return [
            {
                collection: 'users',
                doc: othersUid,
                storeAs: 'profile'
            },
            {
                collection: 'users',
                doc: othersUid,
                subcollections: [{collection: 'profile_pictures'}],
                storeAs: 'profile_pictures',         
            }
        ]
    } else {
        return [
            {
              collection: 'users',
              doc: fba.uid,
              subcollections: [{collection: 'profile_pictures'}],
              storeAs: 'profile_pictures',
            }
        ]      
    }
  }
  