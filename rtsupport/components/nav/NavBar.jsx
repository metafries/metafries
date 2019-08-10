import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withFirebase } from 'react-redux-firebase'
import SignIn from './SignIn.jsx'
import SignOut from './SignOut.jsx'
import { ANONYMOUS } from '../config/imgConstants.jsx'

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
                <div className="navbar navbar-light box-shadow pl-2 my-2">
                    <div className="container-fluid d-flex justify-content-between px-0">
                        <a className="navbar-brand d-flex align-items-center" href="/">
                            <img className="logo mr-1 ml-2" src="/static/images/_logo-icon.png" alt=''/>
                            <img className="logo" src="/static/images/_logo-text.png" alt=''/>
                        </a>
                        <div className="nav-button border-0 mr-2" style={{marginTop:'-13px'}}>
                            <span id="nav-icon3">
                            {
                                authenticated
                                ? <img
                                    src={fbp.avatarUrl || ANONYMOUS}
                                    className='main-menu-icon rounded-circle'
                                    alt="..."
                                    />                      
                                : <img className='main-menu-icon rounded-circle' src={ANONYMOUS} alt=''/>
                            }
                            </span>
                        </div>
                    </div>
                </div> 
                <div className="fixed-top main-menu">
                    <div className="vertical-center px-3">
                        <ul className="nav flex-column horizontal-center">
                            <li className="nav-item delay-1"><a className="nav-link px-2" href={`/search/${fba.uid}`}><i class="fas fa-search signout text-center mr-2"></i>SEARCH</a></li>                    
                            <li className="nav-item delay-1"><a className="nav-link px-2" href="/trending"><i class="fas fa-chart-line signout text-center mr-2"></i>TRENDING</a></li>
                            {
                                authenticated
                                ? <li className="nav-item delay-1"><a className="nav-link px-2" href={`/profile/${fba.uid}`}><i class="fas fa-address-card signout text-center mr-2"></i>PROFILE</a></li>
                                : <li className="nav-item delay-1 disabled"><a className="nav-link px-2" href={`/profile/${fba.uid}`}><i class="fas fa-address-card signout text-center mr-2"></i>PROFILE</a></li> 
                            }                            
                            {
                                authenticated
                                ? <li className="nav-item delay-1"><a className="nav-link px-2" href="/create"><i class="fas fa-plus signout text-center mr-2"></i>CREATE</a></li>
                                : <li className="nav-item delay-1 disabled"><a className="nav-link px-2" href="/create"><i class="fas fa-plus signout text-center mr-2"></i>CREATE</a></li>
                            }                                
                            {
                                authenticated
                                ? <li className="nav-item delay-1"><a className="nav-link px-2" href="/settings"><i class="fas fa-wrench signout text-center mr-2"></i>SETTINGS</a></li>
                                : <li className="nav-item delay-1 disabled"><a className="nav-link px-2" href="/settings"><i class="fas fa-wrench signout text-center mr-2"></i>SETTINGS</a></li>
                            }
                            <li className="nav-item delay-1"><hr/></li>
                            {
                                authenticated 
                                ? <SignOut handleSignOut={this.handleSignOut} /> 
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