import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect, isEmpty } from 'react-redux-firebase'
import { compose } from 'redux'
import Footer from '../../nav/Footer.jsx'
import About from './About.jsx'
import Overview from './Overview.jsx'
import { setAvatar, deleteProfilePicture } from '../userActions.jsx'
import { fetchPhotos } from '../../useracct/userQueries.jsx'

const mapState = (state, ownProps) => {
  let othersUid = null
  let profile = {}
  if (ownProps.match.params.id === state.auth.uid) {
    profile = state.firebase.profile
  } else {
    profile = !isEmpty(state.firestore.ordered.profile) && state.firestore.ordered.profile[0]
    othersUid = ownProps.match.params.id
  }
  return {
    providerId: state.firebase.auth.providerData && state.firebase.auth.providerData[0].providerId,      
    fbp: profile,
    othersUid,
    fba: state.firebase.auth,
    photos: state.firestore.ordered.profile_pictures,
    loading: state.async.loading,    
  }
}

const actions = {
  setAvatar,
  deleteProfilePicture,
}

class Dashboard extends Component {
  render() {
    const {loading, setAvatar, deleteProfilePicture, photos, fba, fbp, providerId} = this.props
    return (
      <div>
        <div className='row'>
          <div className='col-lg-2'></div>
          <About 
            setAvatar={setAvatar}
            deleteProfilePicture={deleteProfilePicture}
            photos={photos}
            fbp={fbp}
            fba={fba}
            providerId={providerId}             
            loading={loading}           
          />          
          <Overview fba={fba} fbp={fbp}/>
          <div className='col-lg-2'></div>
        </div>
        <Footer/>
      </div>
    )
  }
}

export default compose(
  connect(mapState, actions),
  firestoreConnect((auth, othersUid) => fetchPhotos(auth, othersUid)),
)(Dashboard)