import React from 'react'
import { connect } from 'react-redux'
import Menu from './Menu.jsx'
import { Route, Switch, Redirect } from 'react-router-dom'
import Profile from './Profile.jsx'
import Account from './Account.jsx'
import Footer from '../../nav/Footer.jsx'
import { updatePassword } from '../../auth/authActions.jsx'

const mapState = (state) => ({
  providerId: state.firebase.auth.providerData[0].providerId,    
  auth: state.auth
})

const actions = {
    updatePassword
}

const Dashboard = ({auth, providerId, updatePassword}) => {
  return (
    <div className='row'>
        <div className='col-lg-4'>
            <Menu/>
        </div>    
        <div className='col-lg-8'>
            <Switch>
                <Redirect exact from='/settings' to='/settings/profile'/>
                <Route path='/settings/profile' component={Profile}/>
                <Route 
                    path='/settings/account' 
                    render=
                    {
                        () => 
                        <Account 
                            providerId={providerId}                        
                            auth={auth} 
                            updatePassword={updatePassword} 
                        />
                    }
                />
            </Switch>
        </div>
        <Footer/>
    </div>
  )
}

export default connect(mapState, actions)(Dashboard)
