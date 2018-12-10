import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import HomePage from './home/HomePage.jsx'
import LandingPage from './home/LandingPage.jsx'
import Settings from './useracct/Settings/Dashboard.jsx'
import TestComponent from './testarea/TestComponent.jsx'

class App extends Component {
  render() {
    return (
      <switch>
        <Route exact path='/' component={LandingPage}/>
        <Route path='/test' component={TestComponent}/>
        <Route path='/userid' component={HomePage}/>      
        <Route path='/settings' component={Settings}/>
      </switch>
    )
  }
}

export default App