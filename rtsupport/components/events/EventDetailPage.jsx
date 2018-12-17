import React from 'react'
import EventDetailHeader from './EventDetailHeader.jsx'
import EventDetailInfo from './EventDetailInfo.jsx'
import EventDetailChat from './EventDetailChat.jsx'
import EventDetailSidebar from './EventDetailSidebar.jsx'

const EventDetailPage = () => {
  return (
    <div className='row'>
      <div className='col-lg-8'>
        <EventDetailHeader/>
        <EventDetailInfo/>
        <EventDetailChat/>
      </div>
      <div className='col-lg-4'>
        <EventDetailSidebar/>
      </div>
    </div>
  )
}

export default EventDetailPage
