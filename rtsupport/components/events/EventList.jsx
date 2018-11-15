import React, { Component } from 'react'
import EventListItem from './EventListItem.jsx'

class EventList extends Component {
  render() {
    return (
      <div className='col-lg-8'>
        <EventListItem/>
      </div>
    )
  }
}

export default EventList