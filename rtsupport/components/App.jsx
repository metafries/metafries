import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import HomePage from './home/HomePage.jsx'
import LandingPage from './home/LandingPage.jsx'
import SettingsDashboard from './useracct/Settings/Dashboard.jsx'

class App extends Component {
  render() {
    return (
      <switch>
        <Route exact path='/' component={LandingPage}/>
        <Route path='/userid' component={HomePage}/>      
        <Route path='/settings' component={SettingsDashboard}/>
      </switch>
    )
  }
}

export default App