import React from 'react'
import Menu from './Menu.jsx'
import { Route, Switch, Redirect } from 'react-router-dom'
import Profile from './Profile.jsx'
import Account from './Account.jsx'
import Footer from '../../nav/Footer.jsx'

const Dashboard = () => {
  return (
    <div className='row'>
        <div className='col-lg-4'>
            <Menu/>
        </div>    
        <div className='col-lg-8'>
            <Switch>
                <Redirect exact from='/settings' to='/settings/profile'/>
                <Route path='/settings/profile' component={Profile}/>
                <Route path='/settings/account' component={Account}/>
            </Switch>
        </div>
        <Footer/>
    </div>
  )
}

export default Dashboard
