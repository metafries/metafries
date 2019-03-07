import React, { Component } from 'react'
import { connect } from 'react-redux'
import Footer from '../../nav/Footer.jsx'
import About from './About.jsx'
import Overview from './Overview.jsx'

const mapState = (state) => ({
  fbp: state.firebase.profile,
})

class Dashboard extends Component {
  render() {
    const {fbp} = this.props
    return (
      <div className='row'>
        <About fbp={fbp}/>
        <Overview/>
        <Footer/>
      </div>
    )
  }
}

export default connect(mapState)(Dashboard)