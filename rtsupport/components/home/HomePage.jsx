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
          <div className='row'>
            <div className='col-lg-4 mb-3'>
              <div class="input-group mb-3">
                <input 
                  type="text" 
                  class="form-control border-dark rounded-0" 
                  placeholder={
                    authenticated 
                    ? "Sup? "+(fbp.displayName||'')
                    : "Search..."
                  }
                />
                <div class="input-group-append"><button class="btn btn-outline-dark rounded-0" type="button"><i class="fas fa-search"></i></button></div>
              </div>
              <div class="accordion" id="dashboard">
                <SearchEvent/>
                <InstantMsg/>
              </div>
            </div>
            {
              this.props.loading
              ? <div className='col-lg-8'><Loader/></div>
              : <EventList 
                  events={this.props.events} 
                  handleDeleteEvent={this.handleDeleteEvent} 
                  fba={fba}
                />              
            }
            <Footer/>
            </div>
        )
  }
}

export default connect(mapState, actions)(
  firestoreConnect([{ collection: 'events' }])(HomePage)
);