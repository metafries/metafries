import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withFirebase } from 'react-redux-firebase'
import SignIn from './SignIn.jsx'
import SignOut from './SignOut.jsx'

const mapState = (state) => ({
    fbp: state.firebase.profile,    
    fba: state.firebase.auth
})

class NavBar extends Component {
  handleSignOut = () => {
    this.props.firebase.logout()
  }
  render() {
    const {fbp, fba} = this.props
    const authenticated = fba.isLoaded && !fba.isEmpty
    return (
        <div className='row'>
            <div className='col-lg-2'></div>
            <div className='col-lg-8'>
                <div className="navbar navbar-light box-shadow pl-2">
                    <div className="container-fluid d-flex justify-content-between px-0">
                        <a className="navbar-brand d-flex align-items-center" href="/"><img className="logo" src="/static/images/_logo.png"/></a>
                        <a className="nav-button border-0"><span id="nav-icon3" className='mb-5'><span></span><span></span><span></span><span></span></span></a>
                    </div>
                </div> 
                <div className="fixed-top main-menu">
                    <div className="vertical-center px-3">
                        <ul className="nav flex-column horizontal-center">
                            <li className="nav-item delay-1"><a className="nav-link px-2" href={`/search/${fba.uid}`}><i class="fas fa-search signout text-center mr-2"></i>SEARCH</a></li>                    
                            <li className="nav-item delay-2"><a className="nav-link px-2" href="/trending"><i class="fas fa-chart-line signout text-center mr-2"></i>TRENDING</a></li>
                            <li className="nav-item delay-3"><hr/></li>
                            {authenticated && <li className="nav-item delay-4"><a className="nav-link px-2" href={`/profile/${fba.uid}`}><i class="fas fa-address-card signout text-center mr-2"></i>PROFILE</a></li>}
                            {authenticated && <li className="nav-item delay-5"><a className="nav-link px-2" href="/create"><i class="fas fa-plus signout text-center mr-2"></i>CREATE</a></li>}
                            {authenticated && <li className="nav-item delay-6"><a className="nav-link px-2" href="/settings"><i class="fas fa-wrench signout text-center mr-2"></i>SETTINGS</a></li>}
                            {authenticated && <li className="nav-item delay-7"><hr/></li>}
                            {
                                authenticated 
                                ? <SignOut firebaseProfile={fbp} handleSignOut={this.handleSignOut} /> 
                                : <SignIn/>
                            }
                        </ul>
                    </div>
                </div>
            </div>
            <div className='col-lg-2'></div>
        </div>
    )
  }
}

export default withFirebase(connect(mapState)(NavBar))