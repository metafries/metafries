import React, { Component } from 'react'

class NavBar extends Component {
  render() {
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
                        <li className="nav-item delay-1"><a className="nav-link" href="/">HOME</a></li>
                        <li className="nav-item delay-2"><a className="nav-link" href="#">TRENDING</a></li>
                        <li className="nav-item delay-3"><a className="nav-link" href="#">EXPLORE</a></li>
                        <li className="nav-item delay-4"><hr/></li>
                        <li className="nav-item delay-5"><a className="nav-link" href="/login">SIGN IN</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
  }
}

export default NavBar