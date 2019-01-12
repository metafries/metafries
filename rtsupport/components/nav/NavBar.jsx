import React, { Component } from 'react'
import SignIn from './SignIn.jsx'
import SignOut from './SignOut.jsx'

class NavBar extends Component {
  state = {
      authenticated: false
  }
  handleSignIn = () => {
      this.setState({
          authenticated: true
      })
  }
  handleSignOut = () => {
      this.setState({
          authenticated: false
      })
  }
  render() {
    const {authenticated} = this.state
    return (
        <div>
            <div className="navbar navbar-light box-shadow pl-2">
                <div className="container-fluid d-flex justify-content-between px-0">
                    <a className="navbar-brand d-flex align-items-center" href="#"><img className="logo" src="/static/images/_logo.png"/></a>
                    <a className="nav-button"><span id="nav-icon3"><span></span><span></span><span></span><span></span></span></a>
                </div>
            </div> 
            <div className="fixed-top main-menu">
                <div className="vertical-center px-3">
                    <ul className="nav flex-column horizontal-center">
                        <li className="nav-item delay-1"><a className="nav-link px-2" href="/userid"><i class="fas fa-home signout text-center mr-2"></i>HOME</a></li>
                        <li className="nav-item delay-2"><a className="nav-link px-2" href="#"><i class="fas fa-fire signout text-center mr-2"></i>TRENDING</a></li>
                        <li className="nav-item delay-3"><a className="nav-link px-2" href="#"><i class="fas fa-map signout text-center mr-2"></i>EXPLORE</a></li>
                        <li className="nav-item delay-4"><hr/></li>
                        {authenticated && <li className="nav-item delay-5"><a className="nav-link px-2" href="/create"><i class="fas fa-plus signout text-center mr-2"></i>CREATE</a></li>}
                        {authenticated && <li className="nav-item delay-6"><a className="nav-link px-2" href="/settings"><i class="fas fa-wrench signout text-center mr-2"></i>SETTINGS</a></li>}
                        {authenticated && <li className="nav-item delay-7"><hr/></li>}
                        {authenticated ? <SignOut handleSignOut={this.handleSignOut}/> : <SignIn handleSignIn={this.handleSignIn}/>}
                    </ul>
                </div>
            </div>
        </div>
    )
  }
}

export default NavBar