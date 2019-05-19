import React from 'react'
import { DateTime } from "luxon";

const EventDetailSidebar = ({hostUid, attendees}) => {
  return (
    <div className='card rounded-0'>
      <div className='card-header rounded-0 transbox px-3'>
        <h5 className='mb-0'>{attendees && attendees.length} Attendees</h5>              
      </div>
      <div className='card-body px-3'>
        <table class="table">
          <tbody>
            {attendees && attendees.map((attendee) => (
              <tr key={attendee.id}>
                <th scope="row" className='signout px-0'>
                  <a href={`/profile/${attendee.id}`}>
                    <img src={attendee.avatarUrl} className="signout rounded-circle" alt="..."/>
                  </a>
                </th>
                <td>
                  {hostUid == attendee.id && <span class="badge badge-dark rounded-0 mr-1">HOST</span>}
                  <strong>
                    <a className='eds-a' href={`/profile/${attendee.id}`}>
                      {attendee.displayName}
                    </a>
                  </strong>
                  <small className='ml-1 text-secondary'>
                    <span className='mr-1'>Joined</span>
                    {
                      attendee.joinDate && typeof attendee.joinDate === 'object' &&
                      DateTime.fromJSDate(attendee.joinDate.toDate()).toFormat('ff')
                    }
                  </small>
                </td>
                <td className='pr-0'>
                  <button 
                    type="button" 
                    class="btn btn-dark rounded-0 font-weight-bold text-ddc213 float-right px-2">
                    <i class="fas fa-user-plus"></i>
                  </button>           
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