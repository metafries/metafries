import React from 'react'

const EventDetailInfo = ({event}) => {
  return (
    <table class="table">
      <tbody>
        <tr>
          <th scope="row"><i class="fas fa-info"></i></th>
          <td>{event.description}</td>
        </tr>
        <tr>
          <th scope="row"><i class="fas fa-calendar-day"></i></th>
          <td>{event.startDate} - {event.endDate}</td>
        </tr>
        <tr>
          <th scope="row"><i class="fas fa-map-marked-alt"></i></th>
          <td>{event.location}</td>
        </tr>
      </tbody>      
    </table>
  )
}

export default EventDetailInfo
