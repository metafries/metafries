import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import Footer from '../../nav/Footer.jsx'
import About from './About.jsx'
import Overview from './Overview.jsx'
import { deleteProfilePicture } from '../userActions.jsx'

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
})

const actions = {
  deleteProfilePicture,
}

class Dashboard extends Component {
  render() {
    const {deleteProfilePicture, photos, fba, fbp, providerId} = this.props
    const authenticated = fbp.isLoaded && !fbp.isEmpty        
    return (
      <div className='row'>
        {
          authenticated &&
          <About 
            deleteProfilePicture={deleteProfilePicture}
            photos={photos}
            fbp={fbp}
            fba={fba}
            providerId={providerId}             
          />          
        }
        <Overview/>
        <Footer/>
      </div>
    )
  }
}

export default compose(
  connect(mapState, actions),
  firestoreConnect(auth => fetchPhotos(auth)),
)(Dashboard)