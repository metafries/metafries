import React from 'react'
import Menu from './Menu.jsx'
import { Route, Switch, Redirect } from 'react-router-dom'
import About from './About.jsx'
import Attendees from './Attendees.jsx'

const Dashboard = () => {
  return (
    <div className='row'>
        <div className='col-lg-4'>
            <Menu/>
        </div>    
        <div className='col-lg-8'>
            <Switch>
                <Redirect exact from='/modify/:id' to='/modify/:id/about'/>
                <Route path='/modify/:id/about' component={About}/>
                <Route path='/modify/:id/attendees' component={Attendees}/>
            </Switch>
        </div>
    </div>
  )
}

export default Dashboard
