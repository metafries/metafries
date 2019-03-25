import React from 'react'

const EventDetailSidebar = ({attendees}) => {
  const isHost = false
  return (
    <div className='card rounded-0'>
      <div className='card-header rounded-0 transbox'>
        <h5 className='mb-0'>{attendees && attendees.length} Attendees</h5>              
      </div>
      <div className='card-body'>
        <table class="table">
          <tbody>
            {attendees && attendees.map((attendee) => (
              <tr key={attendee.id}>
                <th scope="row" className='signout px-0'>
                  <img src={attendee.avatarUrl} className="signout rounded-circle" alt="..."/>
                </th>
                <td>
                  <strong>{attendee.displayName} </strong>
                  {isHost && <span class="badge badge-secondary rounded-0">Host</span>}              
                  <br/>
                  <small>41 minutes ago</small>
                </td>
                <td className='pr-0'>
                  <button 
                    type="button" 
                    class="btn btn-dark rounded-0 font-weight-bold text-ddc213 float-right">
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