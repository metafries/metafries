import React, { Component } from 'react'

class EventListAttendee extends Component {
  render() {
    const {attendee} = this.props;
    return (
      <div className='float-left attendee mr-1'>
        <img src='/static/images/whazup-square-logo.png' class="img-fluid rounded" alt="..."/>
      </div>          
    )
  }
}

export default EventListAttendee