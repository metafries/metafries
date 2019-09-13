import React, { Component } from 'react'
import Select from 'react-select'
import { connect } from 'react-redux'
import EventList from '../events/EventList.jsx'
import { totalRecommended, recommendedEvents } from '../events/eventActions.jsx'
import Loader from '../layout/Loader.jsx'

const mapState = (state) => ({
  fba: state.firebase.auth,
  events: state.events,
  loading: state.async.loading,
})

const actions = {
  totalRecommended,
  recommendedEvents
}

class Recommended extends Component {
  state = {
    loader: false,
    initialize: true,
    loadedEvents: [],
    opts: 0,
  }
  async componentDidMount() {
    this.setState({
      opts: await this.props.totalRecommended()
    })
    let next = await this.props.recommendedEvents()
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
    const {events} = this.props
    let lastEvent = events && events[events.length-1]
    let next = await this.props.recommendedEvents(lastEvent)
    if (next && next.docs && next.docs.length <= 1) {
      this.setState({
        loader: false
      })
    }
  }
  render() {
    const {statusOpts, type, fba, loading} = this.props
    const {opts, initialize, loadedEvents, loader} = this.state
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
        <h5 className='font-weight-bold px-3'>
          <i class="fas fa-filter mr-2"></i>
          Filter
        </h5>
        <Select
          className='w-auto mb-3 mx-3'
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
            opts={opts}
            events={loadedEvents} 
            fba={fba}
            initialize={initialize}
        />   
        {loading && !initialize && opts !== loadedEvents.length && <Loader/>}
      </div>
    )
  }
}

export default connect(mapState, actions)(Recommended)
