import React, { Component } from 'react'

class NavBar extends Component {
  render() {
    return (
        <div>
            <div class="navbar navbar-light box-shadow">
                <div class="container-fluid d-flex justify-content-between">
                    <a class="navbar-brand d-flex align-items-center" href="#"><img class="logo" src="/static/images/_logo.png"/></a>
                    <a class="nav-button"><span id="nav-icon3"><span></span><span></span><span></span><span></span></span></a>
                </div>
            </div> 
            <div class="fixed-top main-menu">
                <div class="flex-center p-5">
                    <ul class="nav flex-column">
                        <li class="nav-item delay-1"><a class="nav-link" href="#">HOME</a></li>
                        <li class="nav-item delay-2"><a class="nav-link" href="#">TRENDING</a></li>
                        <li class="nav-item delay-3"><a class="nav-link" href="#">EXPLORE</a></li>
                        <li class="nav-item delay-4"><hr/></li>
                        <li class="nav-item delay-5"><a class="nav-link" href="#">SIGN IN</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
  }
}

export default NavBar