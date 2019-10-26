import React from 'react'
import AttendeeList from'./AttendeeList.jsx'

const EventDetailSidebar = ({currentUser, hostUid, attendees}) => {
  return (
    <div className='card rounded-0'>
      <div className='card-header rounded-0 transbox px-3'>
        <h5 className='mb-0'>
          {
            attendees && attendees.length && attendees.length>1 
              ? `${attendees.length} Attendees` 
              : `${attendees.length} Attendee`
          }             
        </h5>              
      </div>
      <div className='card-body px-3'>
        <AttendeeList currentUser={currentUser} hostUid={hostUid} attendees={attendees}/>
      </div>
    </div>
  )
}

export default EventDetailSidebar