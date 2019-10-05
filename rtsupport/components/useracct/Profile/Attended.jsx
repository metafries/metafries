import React, { Component } from 'react'
import Select from 'react-select'
import { connect } from 'react-redux'
import EventList from '../../events/EventList.jsx'
import { SearchBar } from '../../search/SearchBar.jsx'
import { SEARCH_EVENT } from '../../events/eventConstants.jsx'
import { getTotalAttended, getAttendedEvents } from '../../events/eventActions.jsx'
import Loader from '../../layout/Loader.jsx'

const mapState = (state) => ({
  events: state.events,
  loading: state.async.loading,
})

const actions = {
  getTotalAttended,
  getAttendedEvents,
}

class Attended extends Component {
  state = {
    loader: false,
    initialize: true,
    loadedEvents: [],
    total: 0,
  }
  async componentDidMount() {
    const {profileId} = this.props
    this.setState({
      total: await this.props.getTotalAttended(profileId)
    })
    let next = await this.props.getAttendedEvents(profileId)
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
    let next = await this.props.getAttendedEvents(profileId, lastEvent)
    if (next && next.docs && next.docs.length <= 1) {
      this.setState({
        loader: false
      })
    }
  }
  render() {
    const {type, loading, fba, fbp} = this.props  
    const {total, initialize, loadedEvents, loader} = this.state    
    const isCurrentUser = fba.uid === fbp.id  
    return (
      <div>
        <SearchBar placeholder={SEARCH_EVENT}/>
        <Select
          className='w-auto mb-3 mx-3'
          isSearchable={false}
          value={{label:'ALL',value:'All'}}
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

export default connect(mapState, actions)(Attended)