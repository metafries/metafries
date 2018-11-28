import React, { Component } from 'react'
import EventListItem from './EventListItem.jsx'

class EventList extends Component {
  onDeleteEvent = (cancelEvent_id) => {
    this.props.handleDeleteEvent(cancelEvent_id)
  }
  render() {
    const {events} = this.props;
    return (
      <div className='col-lg-8'>
        {events.map((e) => (
          <EventListItem key={e.id} event={e} events={events} onDeleteEvent={this.onDeleteEvent} />        
        ))}
      </div>
    )
  }
}

export default EventList