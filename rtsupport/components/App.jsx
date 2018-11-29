import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import HomePage from './home/HomePage.jsx'
import LandingPage from './home/LandingPage.jsx'

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path='/' component={HomePage}/>
        <Route path='/login' component={LandingPage}/>      
      </div>
    )
  }
}

export default App