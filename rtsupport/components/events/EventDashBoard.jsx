import React, { Component } from 'react'
import EventList from './EventList.jsx'

class EventDashBoard extends Component {
  render() {
    return (
      <div className='row'>
        <div className='col-lg-8'>
          <EventList/>
        </div>
        <div className='col-lg-4'>
          <h2>Right Column</h2>
        </div>
      </div>
    )
  }
}

export default EventDashBoard