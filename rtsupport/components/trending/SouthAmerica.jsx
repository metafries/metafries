import React, { Component } from 'react'
import { connect } from 'react-redux'
import EventList from '../events/EventList.jsx'
import { totalSubscriptions, subscribedEvents } from '../events/eventActions.jsx'
import Loader from '../layout/Loader.jsx'

const mapState = (state) => ({
  fba: state.firebase.auth,
  events: state.events,
  loading: state.async.loading,
})

const actions = {
  totalSubscriptions,
  subscribedEvents
}

class SouthAmerica extends Component {
  state = {
    loader: false,
    initialize: true,
    loadedEvents: [],
    opts: 0,
  }
  async componentDidMount() {
    this.setState({
      opts: await this.props.totalSubscriptions()
    })
    let next = await this.props.subscribedEvents()
    if (next && next.docs && next.docs.length > 1) {
      this.setState({
        loader: true,
        initialize: false,
      })
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.events !== nextProps.events) {
      this.setState({
        loadedEvents: [...this.state.loadedEvents, ...nextProps.events]
      })
    }
  }
  loadMoreEvents = async() => {
    const {events} = this.props
    let lastEvent = events && events[events.length-1]
    let next = await this.props.subscribedEvents(lastEvent)
    if (next && next.docs && next.docs.length <= 1) {
      this.setState({
        loader: false
      })
    }
  }
  render() {
    const {fba, loading} = this.props    
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
        <h6 className='info-text-box mb-3 mx-3 p-2'>
          <i class="fas fa-info-circle mr-2"></i>
          The searching results are now limited to your subscriptions.
        </h6>
        <EventList 
            opts={opts}
            events={loadedEvents} 
            fba={fba}
            loading={initialize}
        />   
        {
          loading && !initialize
          ? <Loader/>
          : <button 
              onClick={this.loadMoreEvents} 
              type="button" 
              class={loader ? "btn btn-link" : "btn btn-link disabled"}
              >
              More
            </button>
        } 
      </div>
    )
  }
}
export default connect(mapState, actions)(SouthAmerica)
