import React, { Component } from 'react'
import EventList from './EventList.jsx'
import EventForm from './EventForm.jsx'

class EventDashBoard extends Component {
  render() {
    return (
      <div className='row'>
        <div className='col-lg-4'>
          <EventForm/>
        </div>
        <EventList/>
      </div>
    )
  }
}

export default EventDashBoard