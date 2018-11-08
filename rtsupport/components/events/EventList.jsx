import React, { Component } from 'react'
import EventListItem from './EventListItem.jsx'

class EventList extends Component {
  render() {
    return (
      <div className='row'>
        <EventListItem/>
        <EventListItem/>
        <EventListItem/>
      </div>
    )
  }
}

export default EventList