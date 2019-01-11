import React from 'react'
import Menu from './Menu.jsx'
import { Route, Switch, Redirect } from 'react-router-dom'
import EventForm from '../../forms/EventForm.jsx'
import GroupForm from '../../forms/GroupForm.jsx'

const Dashboard = () => {
  return (
    <div className='row'>
        <div className='col-lg-4'>
            <Menu/>
        </div>    
        <div className='col-lg-8'>
            <Switch>
                <Redirect exact from='/new' to='/new/event'/>
                <Route path='/new/event' component={EventForm}/>
                <Route path='/new/group' component={GroupForm}/>
            </Switch>
        </div>
    </div>
  )
}

export default Dashboard
