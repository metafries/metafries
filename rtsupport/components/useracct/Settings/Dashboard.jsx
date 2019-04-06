import React from 'react'
import { connect } from 'react-redux'
import Menu from './Menu.jsx'
import { Route, Switch, Redirect } from 'react-router-dom'
import Profile from './Profile.jsx'
import Account from './Account.jsx'
import Footer from '../../nav/Footer.jsx'
import { updatePassword } from '../../auth/authActions.jsx'
import { updateProfile, setNewProfilePicture } from '../userActions.jsx'

const mapState = (state) => ({
    fbp: state.firebase.profile, 
    fba: state.firebase.auth, 
    providerId: state.firebase.auth.providerData[0].providerId,    
    auth: state.auth,
    loading: state.async.loading,
})

const actions = {
    updateProfile,        
    setNewProfilePicture,
    updatePassword
}

const Dashboard = ({
    auth, 
    fbp, 
    fba, 
    providerId, 
    updateProfile,        
    setNewProfilePicture, 
    updatePassword,
    loading,
}) => {
  const authenticated = fbp.isLoaded && !fbp.isEmpty    
  return (
    <div className='row'>
        <div className='col-lg-4'>
            <Menu fba={fba} fbp={fbp}/>
        </div>    
        <div className='col-lg-8'>
            {
                authenticated &&
                <Switch>
                <Redirect exact from='/settings' to='/settings/profile'/>
                <Route 
                    path='/settings/profile'
                    render=
                    {
                        () => 
                        <Profile 
                            fbp={fbp} 
                            fba={fba} 
                            providerId={providerId}
                            updateProfile={updateProfile}                                                        
                            setNewProfilePicture={setNewProfilePicture}
                            loading={loading}
                        />
                    }
                />
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
            }
        </div>
        <Footer/>
    </div>
  )
}

export default connect(mapState, actions)(Dashboard)
