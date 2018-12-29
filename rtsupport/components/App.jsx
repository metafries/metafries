import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import HomePage from './home/HomePage.jsx'
import LandingPage from './home/LandingPage.jsx'
import Create from './useracct/Create/Dashboard.jsx'
import Settings from './useracct/Settings/Dashboard.jsx'
import TestComponent from './testarea/TestComponent.jsx'
import EventDetailPage from './events/EventDetailPage.jsx'

class App extends Component {
  render() {
    return (
      <switch>
        <Route exact path='/' component={LandingPage}/>
        <Route path='/test' component={TestComponent}/>
        <Route path='/userid' component={HomePage}/>      
        <Route path='/event/:id' component={EventDetailPage}/>
        <Route path='/new' component={Create}/>
        <Route path='/settings' component={Settings}/>
      </switch>
    )
  }
}

export default App