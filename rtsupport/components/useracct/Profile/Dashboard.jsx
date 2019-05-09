import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect, isEmpty } from 'react-redux-firebase'
import { compose } from 'redux'
import Footer from '../../nav/Footer.jsx'
import About from './About.jsx'
import Overview from './Overview.jsx'
import { setAvatar, deleteProfilePicture } from '../userActions.jsx'
import { fetchPhotos } from '../../useracct/userQueries.jsx'

const mapState = (state, ownProps) => ({
  providerId: state.firebase.auth.providerData && state.firebase.auth.providerData[0].providerId,      
  fbp: !isEmpty(state.firestore.ordered.profile) && state.firestore.ordered.profile[0],
  profileId: ownProps.match.params.id,
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
    const {profileId, loading, setAvatar, deleteProfilePicture, photos, fba, fbp, providerId} = this.props
    return (
      <div>
        <div className='row'>
          <div className='col-lg-2'></div>
          <About 
            profileId={profileId}
            setAvatar={setAvatar}
            deleteProfilePicture={deleteProfilePicture}
            photos={photos}
            fbp={fbp}
            fba={fba}
            providerId={providerId}             
            loading={loading}           
          />          
          <Overview
            profileId={profileId} 
            fba={fba} 
            fbp={fbp}
          />
          <div className='col-lg-2'></div>
        </div>
        <Footer/>
      </div>
    )
  }
}

export default compose(
  connect(mapState, actions),
  firestoreConnect((profileId) => fetchPhotos(profileId)),
)(Dashboard)