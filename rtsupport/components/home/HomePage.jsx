import React, {Component} from 'react';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import Menu from './Menu.jsx'
import EventList from '../events/EventList.jsx'
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
                <EventList 
                  events={this.props.events} 
                  handleDeleteEvent={this.handleDeleteEvent} 
                  fba={fba}
                  loading={this.props.loading}
                />    
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