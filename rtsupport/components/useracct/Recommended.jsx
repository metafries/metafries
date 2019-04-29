import React, { Component } from 'react'
import { connect } from 'react-redux'
import EventList from '../events/EventList.jsx'
import { recommendedEvents } from '../events/eventActions.jsx'

const mapState = (state) => ({
  fba: state.firebase.auth,
  events: state.events,
  loading: state.async.loading,
})

const actions = {
  recommendedEvents
}

class Recommended extends Component {
  componentDidMount() {
    this.props.recommendedEvents()
  }
  render() {
    const {events, fba, loading} = this.props
    let filteredEvents
    if (events && events.length > 0) {
      filteredEvents = events.filter(evt => {
        return evt.status == 0
      })
    }
    return (
      <div>
        <div class="input-group mb-2 px-3">
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
        <h6 className='info-text-box mb-3 mx-3 p-2'>
          <i class="fas fa-info-circle mr-2"></i>
          The searching results are now limited to the recommended.
        </h6>
        <EventList 
            events={filteredEvents} 
            fba={fba}
            loading={loading}
        />    
      </div>
    )
  }
}

export default connect(mapState, actions)(Recommended)
