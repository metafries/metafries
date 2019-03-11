import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import Footer from '../../nav/Footer.jsx'
import About from './About.jsx'
import Overview from './Overview.jsx'

const fetchPhotos = ({fba}) => {
  return [
    {
      collection: 'users',
      doc: fba.uid,
      subcollections: [{collection: 'photos'}],
      storeAs: 'photos',
    }
  ]
}

const mapState = (state) => ({
  providerId: state.firebase.auth.providerData[0].providerId,      
  fbp: state.firebase.profile,
  fba: state.firebase.auth,
  photos: state.firestore.ordered.photos,
})

class Dashboard extends Component {
  render() {
    const {photos, fbp, providerId} = this.props
    const authenticated = fbp.isLoaded && !fbp.isEmpty        
    return (
      <div className='row'>
        {
          authenticated &&
          <About 
            photos={photos}
            fbp={fbp}
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
  connect(mapState),
  firestoreConnect(auth => fetchPhotos(auth)),
)(Dashboard)