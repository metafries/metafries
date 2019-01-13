import React, {Component} from 'react';
import { connect } from 'react-redux'
import EventList from '../events/EventList.jsx'
import SearchEvent from '../controlpanel/SearchEvent.jsx'
import InstantMsg from '../controlpanel/InstantMsg.jsx'
import { deleteEvent } from '../events/eventActions.jsx'

const mapState = (state) => ({
  events: state.events
})

const actions = {
  deleteEvent
}

class HomePage extends Component {
  handleDeleteEvent = (cancelEvent_id) => {
    this.props.deleteEvent(cancelEvent_id)
  }
  render() {
        return (
          <div className='row'>
            <div className='col-lg-4 mb-3'>
              <div class="input-group mb-3">
                <input type="text" class="form-control border-dark rounded-0" placeholder="Sup?"/>
                <div class="input-group-append"><button class="btn btn-outline-dark rounded-0" type="button"><i class="fas fa-search"></i></button></div>
              </div>
              <div class="accordion" id="dashboard">
                <SearchEvent/>
                <InstantMsg/>
              </div>
            </div>
            <EventList events={this.props.events} handleDeleteEvent={this.handleDeleteEvent} />
            </div>
        )
  }
}

export default connect(mapState, actions)(HomePage);