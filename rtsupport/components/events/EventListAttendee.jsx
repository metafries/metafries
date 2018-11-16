import React, { Component } from 'react'

class EventListAttendee extends Component {
  render() {
    const {attendee} = this.props;
    return (
      <div className='float-left attendee'>
        <img src={attendee.photoURL} class="img-fluid mr-1" alt="..."/>
      </div>          
    )
  }
}

export default EventListAttendee