import React from 'react'
import EventDetailHeader from './EventDetailHeader.jsx'
import EventDetailInfo from './EventDetailInfo.jsx'
import EventDetailChat from './EventDetailChat.jsx'
import EventDetailSidebar from './EventDetailSidebar.jsx'

const event = {
  id: '1',
  title: 'Trip to Tower of London',
  startDate: '2018/03/27, 11:00',
  endDate: '2018/03/28, 14:00',    
  category: 'culture',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
  location: 'Lower Kings Road, Brighton BN1 2LN英國',
  venue: "British Airways i360",
  hostedBy: 'Bob',
  hostPhotoURL: '',
  attendees: [
    {
      id: 'a',
      name: 'Bob',
      photoURL: '/static/images/whazup-square-logo.png'
    },
    {
      id: 'b',
      name: 'Tom',
      photoURL: '/static/images/whazup-square-logo.png'
    }
  ]
}

const EventDetailPage = () => {
  return (
    <div className='row'>
      <div className='col-lg-8'>
        <EventDetailHeader event={event}/>
        <EventDetailInfo event={event}/>
        <EventDetailChat/>
      </div>
      <div className='col-lg-4'>
        <EventDetailSidebar attendees={event.attendees}/>
      </div>
    </div>
  )
}

export default EventDetailPage
