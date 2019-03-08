import React, { Component } from 'react'
import { connect } from 'react-redux'
import Footer from '../../nav/Footer.jsx'
import About from './About.jsx'
import Overview from './Overview.jsx'

const mapState = (state) => ({
  providerId: state.firebase.auth.providerData[0].providerId,      
  fbp: state.firebase.profile,
})

class Dashboard extends Component {
  render() {
    const {providerId, fbp} = this.props
    const authenticated = fbp.isLoaded && !fbp.isEmpty        
    return (
      <div className='row'>
        {
          authenticated &&
          <About providerId={providerId} fbp={fbp}/>          
        }
        <Overview/>
        <Footer/>
      </div>
    )
  }
}

export default connect(mapState)(Dashboard)