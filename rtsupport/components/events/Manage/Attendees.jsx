import React, { Component } from 'react'
import AttendeeList from'../AttendeeList.jsx'

class Attendees extends Component {
  render() {
    const { currentUser, hostUid, attendees } = this.props
    return (
      <div>
        <h4 className='mb-0 font-weight-bold'>
        {
          attendees && attendees.length && attendees.length>1 
            ? `${attendees.length} Attendees` 
            : `${attendees.length} Attendee`
        }             
        </h4>
        <hr/>   
        <AttendeeList currentUser={currentUser} hostUid={hostUid} attendees={attendees}/>
      </div>
    )
  }
}

export default Attendees
