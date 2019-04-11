import React, {Component} from 'react';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import EventList from '../events/EventList.jsx'
import SearchEvent from '../controlpanel/SearchEvent.jsx'
import InstantMsg from '../controlpanel/InstantMsg.jsx'
import { deleteEvent } from '../events/eventActions.jsx'
import Footer from '../nav/Footer.jsx'
import Loader from '../layout/Loader.jsx'

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
                <h4 className='mb-0 font-weight-bold'>
                  <img src={fbp.avatarUrl} className='signout mr-2 rounded-circle'/>
                  {fbp.displayName}
                </h4>              
                <div class="input-group my-3">
                  <input 
                    type="text" 
                    class="form-control border-dark rounded-0" 
                    placeholder="Search..."
                  />
                  <div class="input-group-append"><button class="btn btn-dark rounded-0" type="button"><i class="fas fa-search"></i></button></div>
                </div>
              </div>
              {
                this.props.loading
                ? <div className='col-lg-5 px-0'><Loader/></div>
                : <EventList 
                    events={this.props.events} 
                    handleDeleteEvent={this.handleDeleteEvent} 
                    fba={fba}
                  />              
              }
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