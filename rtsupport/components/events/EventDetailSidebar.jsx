import React from 'react'
import { DateTime } from "luxon";
import { optimizePixel } from '../../app/common/util/shapers.js'

const EventDetailSidebar = ({currentUser, hostUid, attendees}) => {
  attendees && attendees.sort(function(a,b) {
    return b.joinDate.toDate() - a.joinDate.toDate()
  })
  const attendeeList = attendees && attendees.slice(0,attendees.length-1)
  attendeeList.unshift(attendees[attendees.length-1])
  return (
    <div className='card rounded-0'>
      <div className='card-header rounded-0 transbox px-3'>
        <h5 className='mb-0'>{attendees && attendees.length} Attendees</h5>              
      </div>
      <div className='card-body px-3'>
        <table class="table">
          <tbody>
            {attendeeList && attendeeList.map((attendee) => (
              <tr key={attendee.id}>
                <th scope="row" className='signout px-0'>
                  <a href={`/profile/${attendee.id}`}>
                    <img src={optimizePixel(attendee.avatarUrl)} className="signout rounded-circle" alt="..."/>
                  </a>
                </th>
                <td>
                  <a className='eds-a font-weight-bold' href={`/profile/${attendee.id}`}>
                    {attendee.displayName}
                  </a>
                  {
                    hostUid === attendee.id && 
                    <span class="badge badge-dark rounded-0 ml-2">HOST</span>
                  }
                  <small className='d-block text-secondary'>
                    <span className='mr-1'>Joined at</span>
                    {
                      attendee.joinDate && typeof attendee.joinDate === 'object' &&
                      DateTime.fromJSDate(attendee.joinDate.toDate()).toFormat('ff')
                    }
                  </small>
                </td>
                <td className='px-0'>
                  {
                    currentUser.uid !== attendee.id &&
                    <button 
                      type="button" 
                      class="btn btn-dark rounded-0 font-weight-bold text-ddc213 float-right px-2"
                      >
                      <i class="fas fa-user-plus"></i>
                    </button>                    
                  }          
                </td>
              </tr>        
            ))}
          </tbody>      
        </table>
      </div>
    </div>
  )
}

export default EventDetailSidebar