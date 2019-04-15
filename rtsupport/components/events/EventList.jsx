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
        <div class="input-group mb-3 px-3">
          <input 
            type="text" 
            class="form-control form-control-lg rounded-0 border-left-0 border-top-0 border-right-0 mr-2 font-weight-bold search-bar"
            placeholder='Sup? Search Events ...'
          />
          <div class="input-group-append">
            <button class="btn btn-link rounded-0 py-0 pl-2 pr-1 text-000 search-icon" type="button">
              <i class="fas fa-search h4"></i>
            </button>
          </div>
        </div>
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