import React, { Component } from 'react'
import Select from 'react-select'
import { connect } from 'react-redux'
import EventList from '../../events/EventList.jsx'
import { getTotalGoing, getGoingEvents } from '../../events/eventActions.jsx'
import Loader from '../../layout/Loader.jsx'

const mapState = (state) => ({
  events: state.events,
  loading: state.async.loading,
})

const actions = {
  getTotalGoing,
  getGoingEvents,
}

class Going extends Component {
  state = {
    loader: false,
    initialize: true,
    loadedEvents: [],
    total: 0,
  }
  async componentDidMount() {
    const {profileId} = this.props
    this.setState({
      total: await this.props.getTotalGoing(profileId)
    })
    let next = await this.props.getGoingEvents(profileId)
    if (next && next.docs && next.docs.length >= 1) {      
      this.setState({
        loader: true,
        initialize: false,
      })
    }
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    const nextEvents = prevState.initialize ? [] : nextProps.events 
    const prevEvents = prevState.loadedEvents
    if (nextEvents[nextEvents.length-1] !== prevEvents[prevEvents.length-1]) {
      return {
        loadedEvents: [...prevEvents, ...nextEvents]        
      }     
    }
    // Return null to indicate no change to state.
    return null
  }
  loadMoreEvents = async() => {
    const {profileId, events} = this.props
    let lastEvent = events && events[events.length-1]
    let next = await this.props.getGoingEvents(profileId, lastEvent)
    if (next && next.docs && next.docs.length <= 1) {
      this.setState({
        loader: false
      })
    }
  }
  render() {
    const {statusOpts, type, loading, fba, fbp} = this.props  
    const {total, initialize, loadedEvents, loader} = this.state    
    const isCurrentUser = fba.uid === fbp.id  
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
        <Select
          className='w-auto mb-3 mx-3'
          isSearchable={false}
          value={statusOpts[0]}
          theme={(theme) => ({
            ...theme,
            borderRadius: 0,
            colors: {
            ...theme.colors,
              primary25: '#f5f5f5',
              primary50: '#f5f5f5',
              primary: '#303aa5',
            },
          })}
        />
        <EventList 
            type={type}
            loadMoreEvents={this.loadMoreEvents}
            loader={loader}
            loading={loading}
            opts={total}
            events={loadedEvents} 
            fba={fba}
            initialize={initialize}
        />   
        {loading && !initialize && total !== loadedEvents.length && <Loader/>}
      </div>
    )
  }
}

export default connect(mapState, actions)(Going)