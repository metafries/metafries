import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import HomePage from './home/HomePage.jsx'
import LandingPage from './home/LandingPage.jsx'
import Settings from './useracct/Settings/Dashboard.jsx'
import TestComponent from './testarea/TestComponent.jsx'
import EventDetailPage from './events/EventDetailPage.jsx'
import EventSettings from './events/Settings/Dashboard.jsx'
import Create from './nav/Create/Dashboard.jsx'

class App extends Component {
  render() {
    return (
      <switch>
        <Route exact path='/' component={LandingPage}/>
        <Route path='/test' component={TestComponent}/>
        <Route path='/userid' component={HomePage}/>      
        <Route path='/events/:id' component={EventDetailPage}/>
        <Route path='/mod/events/:id' component={EventSettings}/>
        <Route path='/new' component={Create}/>
        <Route path='/settings' component={Settings}/>
      </switch>
    )
  }
}

export default App