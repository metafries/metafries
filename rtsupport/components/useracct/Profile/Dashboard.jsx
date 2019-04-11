import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import Footer from '../../nav/Footer.jsx'
import About from './About.jsx'
import Overview from './Overview.jsx'
import { setAvatar, deleteProfilePicture } from '../userActions.jsx'

const fetchPhotos = ({fba}) => {
  return [
    {
      collection: 'users',
      doc: fba.uid,
      subcollections: [{collection: 'profile_pictures'}],
      storeAs: 'profile_pictures',
    }
  ]
}

const mapState = (state) => ({
  providerId: state.firebase.auth.providerData[0].providerId,      
  fbp: state.firebase.profile,
  fba: state.firebase.auth,
  photos: state.firestore.ordered.profile_pictures,
  loading: state.async.loading,  
})

const actions = {
  setAvatar,
  deleteProfilePicture,
}

class Dashboard extends Component {
  render() {
    const {loading, setAvatar, deleteProfilePicture, photos, fba, fbp, providerId} = this.props
    const authenticated = fbp.isLoaded && !fbp.isEmpty        
    return (
      <div>
        <div className='row'>
          <div className='col-lg-2'></div>
          {
            authenticated &&
            <About 
              setAvatar={setAvatar}
              deleteProfilePicture={deleteProfilePicture}
              photos={photos}
              fbp={fbp}
              fba={fba}
              providerId={providerId}             
              loading={loading}           
            />          
          }
          <Overview/>
          <div className='col-lg-2'></div>
        </div>
        <Footer/>
      </div>
    )
  }
}

export default compose(
  connect(mapState, actions),
  firestoreConnect(auth => fetchPhotos(auth)),
)(Dashboard)