import React, { Component } from 'react'
import EventListItem from './EventListItem.jsx'
import Loader from '../layout/Loader.jsx'

class EventList extends Component {
  render() {
    const {fba, events} = this.props;
    return (
      <div>
        {
          this.props.loading
          ? <Loader/>
          : <div>
              <h5 className='mx-3 font-weight-bold '>
                Total of
                <span className='mx-1'>{events && events.length}</span>
                {events && events.length > 1 ? 'Events' : 'Event'}
              </h5>
              {events && events.length > 0 && events.map((e) => (
                <EventListItem key={e.id} fba={fba} event={e} events={events} />        
              ))}
            </div>
        }
      </div>
    )
  }
}

export default EventList