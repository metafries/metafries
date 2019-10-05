import React, { Component } from 'react'
import Select from 'react-select'
import { connect } from 'react-redux'
import EventList from '../events/EventList.jsx'
import { SearchBar } from '../search/SearchBar.jsx'
import { SEARCH_EVENT } from '../events/eventConstants.jsx'
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
    const {type, fba, loading} = this.props
    const {opts, initialize, loadedEvents, loader} = this.state
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
