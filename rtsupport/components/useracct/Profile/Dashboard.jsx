import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect, isEmpty } from 'react-redux-firebase'
import { compose } from 'redux'
import Footer from '../../nav/Footer.jsx'
import About from './About.jsx'
import Overview from './Overview.jsx'
import { setAvatar, deleteProfilePicture } from '../userActions.jsx'
import { getTotalSaved, getTotalAttended, getTotalGoing, getTotalHosting } from '../../events/eventActions.jsx'
import { fetchPhotos } from '../../useracct/userQueries.jsx'

const mapState = (state, ownProps) => ({
  providerId: state.firebase.auth.providerData && state.firebase.auth.providerData[0].providerId,      
  fbp: !isEmpty(state.firestore.ordered.profile) && state.firestore.ordered.profile[0],
  profileId: ownProps.match.params.id,
  fba: state.firebase.auth,
  photos: state.firestore.ordered.profile_pictures,
  loading: state.async.loading,  
  processing: state.async.processing,  
})

const actions = {
  getTotalSaved,
  getTotalAttended,
  getTotalGoing,
  getTotalHosting,
  setAvatar,
  deleteProfilePicture,
}

class Dashboard extends Component {
  state = {
    totalSaved: 0,
    totalAttended: 0,
    totalGoing: 0,
    totalHosting: 0,
  }
  async componentDidMount() {
    const {profileId} = this.props
    this.setState({
      totalSaved: await this.props.getTotalSaved(profileId),
      totalAttended: await this.props.getTotalAttended(profileId),
      totalGoing: await this.props.getTotalGoing(profileId),
      totalHosting: await this.props.getTotalHosting(profileId),
    })
  }
  render() {
    const {processing, profileId, loading, setAvatar, deleteProfilePicture, photos, fba, fbp, providerId} = this.props
    const {totalSaved, totalAttended, totalGoing, totalHosting} = this.state
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
            loading={processing}           
          />          
          <Overview
            totalSaved={totalSaved}
            totalAttended={totalAttended}
            totalGoing={totalGoing}
            totalHosting={totalHosting}
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