import React, { Component } from 'react'
import EventListItem from './EventListItem.jsx'
import Loader from '../layout/Loader.jsx'

class EventList extends Component {
  onDeleteEvent = (cancelEvent_id) => {
    this.props.handleDeleteEvent(cancelEvent_id)
  }
  render() {
    const {fba, events} = this.props;
    return (
      <div>
        {
          this.props.loading
          ? <Loader/>
          : <div>
              {events && events.map((e) => (
                <EventListItem key={e.id} fba={fba} event={e} events={events} onDeleteEvent={this.onDeleteEvent} />        
              ))}
            </div>
        }
      </div>
    )
  }
}

export default EventList