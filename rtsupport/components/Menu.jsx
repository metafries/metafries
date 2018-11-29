import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import NavBar from './nav/NavBar.jsx'

class Menu extends Component {
  render() {
    return (
      <div>
        <Route exact path='/' component={NavBar}/>
      </div>
    )
  }
}

export default Menu