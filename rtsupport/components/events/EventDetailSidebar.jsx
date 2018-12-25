import React from 'react'

const EventDetailSidebar = ({attendees}) => {
  const isHost = false
  return (
    <table class="table">
      <thead>
        <tr className='h4'>
          <th scope="col"><i class="fas fa-user-check"></i></th>
          <th scope="col">{attendees && attendees.length} Attendees</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {attendees && attendees.map((attendee) => (
          <tr key={attendee.id}>
            <th scope="row" className='contact px-0'>
              <img src={attendee.photoURL} className="contact rounded-circle" alt="..."/>
            </th>
            <td>
              <strong>{attendee.name} </strong>
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
  )
}

export default EventDetailSidebar