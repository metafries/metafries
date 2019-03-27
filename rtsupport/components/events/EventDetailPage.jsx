import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withFirestore } from 'react-redux-firebase'
import EventDetailHeader from './EventDetailHeader.jsx'
import EventDetailInfo from './EventDetailInfo.jsx'
import EventDetailChat from './EventDetailChat.jsx'
import EventDetailSidebar from './EventDetailSidebar.jsx'
import Footer from '../nav/Footer.jsx'
import { objToArray } from '../../app/common/util/shapers.js'

const mapState = (state, ownProps) => {
  const eventId = ownProps.match.params.id
  const {events} = state.firestore.ordered
  let event = {}
  if (eventId && events && events.length > 0) {
    event = events.find(e => e.id == eventId)
  }
  return {event}
}

class EventDetailPage extends Component {
  state = {
    eventNotFoundMsg: '',
  }
  async componentDidMount() {
    const {firestore, match} = this.props
    let selectedEvent = await firestore.get(`events/${match.params.id}`)
    if (!selectedEvent.exists) {
      this.setState({
        eventNotFoundMsg: 'The event may have been deleted'
      })
    }
  }
  render() {
    const {event} = this.props
    const convertedAttendees = event && event.attendees && objToArray(event.attendees)
    const {eventNotFoundMsg} = this.state
    return (
      <div className='row'>
        {
          eventNotFoundMsg.length > 0 &&
          <h6 className='input-err-msg p-2 container-fluid mx-3'>
            <i class="fas fa-exclamation-circle mr-2 my-1"></i>
            <span className='my-1'>{eventNotFoundMsg}</span>
            <i class="fas fa-minus mx-2 my-1"></i>
            <a href="/create" className='badge badge-pill badge-dark my-1 py-0'>create a new one.</a>
          </h6>
        }
        {
          eventNotFoundMsg.length == 0 &&
          <div className='col-lg-8'>
            <EventDetailHeader event={event}/>
            <EventDetailInfo event={event}/>
          </div>
        }
        {
          eventNotFoundMsg.length == 0 &&
          <div className='col-lg-4'>
            <EventDetailSidebar attendees={convertedAttendees}/>
            <EventDetailChat/>
          </div>
        }
        <Footer/>
      </div>
    )
  }
}

export default withFirestore(connect(mapState)(EventDetailPage))
