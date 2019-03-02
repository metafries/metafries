import React, { Component } from 'react'
import { connect } from 'react-redux'
import Footer from '../../nav/Footer.jsx'
import About from './About.jsx'
import Overview from './Overview.jsx'

const mapState = (state) => ({
  fba: state.firebase.auth,
})

class Dashboard extends Component {
  render() {
    const {fba} = this.props
    return (
      <div className='row'>
        <About fba={fba}/>
        <Overview/>
        <Footer/>
      </div>
    )
  }
}

export default connect(mapState)(Dashboard)