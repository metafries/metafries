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
            <div className="navbar navbar-light box-shadow">
                <div className="container-fluid d-flex justify-content-between">
                    <a className="navbar-brand d-flex align-items-center" href="#"><img className="logo" src="/static/images/_logo.png"/></a>
                    <a className="nav-button"><span id="nav-icon3"><span></span><span></span><span></span><span></span></span></a>
                </div>
            </div> 
            <div className="fixed-top main-menu">
                <div className="flex-center p-5">
                    <ul className="nav flex-column">
                        <li className="nav-item delay-1"><a className="nav-link px-2" href="/"><i class="fas fa-home"></i> HOME</a></li>
                        <li className="nav-item delay-2"><a className="nav-link px-2" href="#"><i class="fas fa-fire"></i> TRENDING</a></li>
                        <li className="nav-item delay-3"><a className="nav-link px-2" href="#"><i class="fas fa-map"></i> EXPLORE</a></li>
                        <li className="nav-item delay-4"><hr/></li>
                        {authenticated && <li className="nav-item delay-5"><a className="nav-link px-2" href="#"><i class="fas fa-wrench"></i> SETTINGS</a></li>}
                        {authenticated && <li className="nav-item delay-6"><hr/></li>}
                        {authenticated ? <SignOut handleSignOut={this.handleSignOut}/> : <SignIn handleSignIn={this.handleSignIn}/>}
                    </ul>
                </div>
            </div>
        </div>
    )
  }
}

export default NavBar