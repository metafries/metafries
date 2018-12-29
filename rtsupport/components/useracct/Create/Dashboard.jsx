import React from 'react'
import Menu from './Menu.jsx'
import { Route, Switch, Redirect } from 'react-router-dom'
import Event from './Event.jsx'
import Group from './Group.jsx'

const Dashboard = () => {
  return (
    <div className='row'>
        <div className='col-lg-4'>
            <Menu/>
        </div>    
        <div className='col-lg-8'>
            <Switch>
                <Redirect exact from='/new' to='/new/event'/>
                <Route path='/new/event' component={Event}/>
                <Route path='/new/group' component={Group}/>
            </Switch>
        </div>
    </div>
  )
}

export default Dashboard
