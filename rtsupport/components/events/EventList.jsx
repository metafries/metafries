import React, { Component } from 'react'
import EventListItem from './EventListItem.jsx'

class EventList extends Component {
  render() {
    const {events} = this.props;
    return (
      <div className='col-lg-8'>
        {events.map((e) => (
          <EventListItem key={e.id} event={e} />        
        ))}
      </div>
    )
  }
}

export default EventList