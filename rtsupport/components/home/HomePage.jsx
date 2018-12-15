import React, {Component} from 'react';
import { connect } from 'react-redux'
import EventList from '../events/EventList.jsx'
import cuid from 'cuid'
import SearchEvent from '../controlpanel/SearchEvent.jsx'
import CreateEvent from '../controlpanel/CreateEvent.jsx'
import InstantMsg from '../controlpanel/InstantMsg.jsx'

const mapState = (state) => ({
  events: state.events
})

class HomePage extends Component {
  handleCreateEvent = (newEvent) => {
   newEvent.id = cuid();
   newEvent.hostedBy = newEvent.id;
   newEvent.attendees = [
    {
      id: 'b',
      name: 'Tom',
      photoURL: ''
    },
    {
      id: 'a',
      name: 'Bob',
      photoURL: ''
    }
   ]
   const updatedEvents = [newEvent, ...this.state.events];
   this.setState({
     events: updatedEvents
   });
  }
  handleDeleteEvent = (cancelEvent_id) => {
    const updatedEvents = this.state.events.filter(e => e.id !== cancelEvent_id)
    this.setState({
      events: updatedEvents
    })
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
                <CreateEvent handleCreateEvent={this.handleCreateEvent}/>
                <InstantMsg/>
              </div>
            </div>
            <EventList events={this.props.events} handleDeleteEvent={this.handleDeleteEvent} />
            </div>
        )
  }
}

export default connect(mapState)(HomePage);