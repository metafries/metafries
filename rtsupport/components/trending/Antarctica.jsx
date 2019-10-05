import React, { Component } from 'react'
import Select from 'react-select'
import { connect } from 'react-redux'
import EventList from '../events/EventList.jsx'
import { SearchBar } from '../search/SearchBar.jsx'
import { SEARCH_EVENT } from '../events/eventConstants.jsx'
import { getTotalOfContinent, getEventsByContinent } from '../events/eventActions.jsx'
import Loader from '../layout/Loader.jsx'

const mapState = (state) => ({
  fba: state.firebase.auth,
  events: state.events,
  loading: state.async.loading,
})

const actions = {
  getTotalOfContinent,
  getEventsByContinent,
}

class Antarctica extends Component {
  state = {
    selectedStatus: this.props.statusOpts[0],
    loader: false,
    initialize: true,
    loadedEvents: [],
    opts: 0,
  }
  async componentDidMount() {
    const {selectedStatus} = this.state
    this.setState({
      opts: await this.props.getTotalOfContinent(selectedStatus, 'AN')
    })
    let next = await this.props.getEventsByContinent(selectedStatus, 'AN')
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
    const {selectedStatus} = this.state
    let lastEvent = events && events[events.length-1]
    let next = await this.props.getEventsByContinent(selectedStatus, 'AN', lastEvent)
    if (next && next.docs && next.docs.length <= 1) {
      this.setState({
        loader: false
      })
    }
  }
  handleStatusChange = async(selectedStatus) => {
    this.setState({selectedStatus});
    let total = await this.props.getTotalOfContinent(selectedStatus, 'AN')
    this.setState({
      loader: false,
      initialize: true,
      loadedEvents: [],  
      opts: total,
    })
    let next = await this.props.getEventsByContinent(selectedStatus, 'AN')
    if (next && next.docs && next.docs.length >= 1) {
      this.setState({
        loader: true,
        initialize: false,
      })
    }
  }
  render() {
    const {statusOpts, type, fba, loading} = this.props    
    const {selectedStatus, opts, initialize, loadedEvents, loader} = this.state
    return (
      <div>
        <SearchBar placeholder={SEARCH_EVENT}/>
        <Select
          className='w-auto mb-3 mx-3'
          isSearchable={false}
          value={selectedStatus}
          options={statusOpts}
          onChange={this.handleStatusChange}
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
          isGeo={true}
          type={type}
          loadMoreEvents={this.loadMoreEvents}
          loader={loader}
          loading={loading}
          status={selectedStatus.value}
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
export default connect(mapState, actions)(Antarctica)
