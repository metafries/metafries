import React from 'react'
import { connect } from 'react-redux'
import EventDetailHeader from './EventDetailHeader.jsx'
import EventDetailInfo from './EventDetailInfo.jsx'
import EventDetailChat from './EventDetailChat.jsx'
import EventDetailSidebar from './EventDetailSidebar.jsx'

const mapState = (state, ownProps) => {
  const eventId = ownProps.match.params.id
  let event = {}
  if (eventId && state.events.length > 0) {
    event = state.events.find(e => e.id === eventId)
  }
  return {event}
}

const EventDetailPage = ({event}) => {
  return (
    <div className='row'>
      <div className='col-lg-8'>
        <EventDetailHeader event={event}/>
        <EventDetailInfo event={event}/>
      </div>
      <div className='col-lg-4'>
        <EventDetailSidebar attendees={event.attendees}/>
        <EventDetailChat/>
      </div>
    </div>
  )
}

export default connect(mapState)(EventDetailPage)
