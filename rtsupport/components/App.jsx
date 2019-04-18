import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import HomePage from './home/HomePage.jsx'
import Trending from './trending/Dashboard.jsx'
import Profile from './useracct/Profile/Dashboard.jsx'
import LandingPage from './home/LandingPage.jsx'
import Settings from './useracct/Settings/Dashboard.jsx'
import TestComponent from './testarea/TestComponent.jsx'
import EventDetailPage from './events/EventDetailPage.jsx'
import EventManagement from './events/Manage/Dashboard.jsx'
import CreateNav from './nav/Create/Dashboard.jsx'

class App extends Component {
  render() {
    return (
      <switch>
        <Route exact path='/' component={LandingPage}/>
        <Route path='/test' component={TestComponent}/>
        <Route path='/search/:id' component={HomePage}/> 
        <Route path='/trending' component={Trending}/>
        <Route path='/profile/:id' component={Profile}/>
        <Route path='/events/:id' component={EventDetailPage}/>
        <Route path='/manage/events/:id' component={EventManagement}/>
        <Route path='/create' component={CreateNav}/>
        <Route path='/settings' component={Settings}/>
      </switch>
    )
  }
}

export default App