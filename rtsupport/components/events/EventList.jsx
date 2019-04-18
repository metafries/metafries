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
              {events && events.map((e) => (
                <EventListItem key={e.id} fba={fba} event={e} events={events} />        
              ))}
            </div>
        }
      </div>
    )
  }
}

export default EventList