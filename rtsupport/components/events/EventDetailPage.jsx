import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withFirestore } from 'react-redux-firebase'
import EventDetailHeader from './EventDetailHeader.jsx'
import EventDetailInfo from './EventDetailInfo.jsx'
import EventDetailChat from './EventDetailChat.jsx'
import EventDetailSidebar from './EventDetailSidebar.jsx'
import Footer from '../nav/Footer.jsx'

const mapState = (state, ownProps) => {
  const eventId = ownProps.match.params.id
  let event = {}
  if (eventId && state.events.length > 0) {
    event = state.events.find(e => e.id === eventId)
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
        eventNotFoundMsg: 'Event Not Found - '
      })
    }
  }
  render() {
    const {event} = this.props
    const {eventNotFoundMsg} = this.state
    return (
      <div className='row'>
        {
          eventNotFoundMsg.length > 0 &&
          <h6 className='input-err-msg p-2 container-fluid mx-3'>
            <i class="fas fa-exclamation-triangle mr-2"></i>
            {eventNotFoundMsg}
            <a href='/create'>CREATE</a>
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
            <EventDetailSidebar attendees={event.attendees}/>
            <EventDetailChat/>
          </div>
        }
        <Footer/>
      </div>
    )
  }
}

export default withFirestore(connect(mapState)(EventDetailPage))
