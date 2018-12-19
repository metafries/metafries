import React from 'react'

const EventDetailInfo = () => {
  return (
    <table class="table">
      <tbody>
        <tr>
          <th scope="row"><i class="fas fa-info"></i></th>
          <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.</td>
        </tr>
        <tr>
          <th scope="row"><i class="fas fa-calendar-day"></i></th>
          <td>2018/03/28, 14:00 - 2018/03/29, 11:00</td>
        </tr>
        <tr>
          <th scope="row"><i class="fas fa-map-marked-alt"></i></th>
          <td>Lower Kings Road, Brighton BN1 2LN英國</td>
        </tr>
      </tbody>      
    </table>
  )
}

export default EventDetailInfo
