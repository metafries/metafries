import React, {Component} from 'react';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { Route, Switch, Redirect } from 'react-router-dom'
import Menu from './Menu.jsx'
import Recommended from '../useracct/Recommended.jsx'
import Subscriptions from '../useracct/Subscriptions.jsx'
import ActivityLog from '../useracct/ActivityLog.jsx'
import SearchEvent from '../controlpanel/SearchEvent.jsx'
import InstantMsg from '../controlpanel/InstantMsg.jsx'
import { deleteEvent } from '../events/eventActions.jsx'
import Footer from '../nav/Footer.jsx'

const mapState = (state) => ({
  fbp: state.firebase.profile,
  fba: state.firebase.auth,
  events: state.firestore.ordered.events,
  loading: state.async.loading
})

const actions = {
  deleteEvent
}

class HomePage extends Component {
  handleDeleteEvent = (cancelEvent_id) => {
    this.props.deleteEvent(cancelEvent_id)
  }
  render() {
        const {fbp, fba} = this.props
        const authenticated = fba.isLoaded && !fba.isEmpty        
        return (
          <div>
            <div className='row'>
              <div className='col-lg-2'></div>
              <div className='col-lg-3 px-3'>
                <Menu fba={fba} fbp={fbp}/>
              </div>
              <div className='col-lg-5 px-0'>
                <Switch>
                  <Redirect 
                    exact from={`/search/${fba.uid}`} to={`/search/${fba.uid}/recommended`}
                    />
                  <Route
                    path={`/search/${fba.uid}/recommended`}
                    render={() => <Recommended
                      events={this.props.events} 
                      handleDeleteEvent={this.handleDeleteEvent} 
                      fba={fba}
                      loading={this.props.loading}
                    />}
                  />
                  <Route
                    path={`/search/${fba.uid}/subscriptions`}
                    render={() => <Subscriptions
                      events={this.props.events} 
                      handleDeleteEvent={this.handleDeleteEvent} 
                      fba={fba}
                      loading={this.props.loading}
                    />}
                  />
                  <Route
                    path={`/search/${fba.uid}/activity`}
                    render={() => <ActivityLog/>}
                  />
                </Switch>
              </div>
              <div className='col-lg-2'></div>
            </div>
            <Footer/>
          </div>
        )
  }
}

export default connect(mapState, actions)(
  firestoreConnect([{ collection: 'events' }])(HomePage)
);