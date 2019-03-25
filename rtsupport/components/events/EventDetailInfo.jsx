import React, { Component } from 'react'
import EventDetailMap from './EventDetailMap.jsx'
import { DateTime } from "luxon";

class EventDetailInfo extends Component {
  state = {
    showMap: false
  }
  showMapToggle = () => {
    this.setState(prevState => ({
      showMap: !prevState.showMap
    }))
  }
  render() {
    const {event} = this.props
    return (
      <div>
        <hr/>
        <h4 className='font-weight-bold pl-2'>5,752 views</h4>
        <table class="table">
          <tbody>
            <tr>
              <th scope="row"><i class="fas fa-info"></i></th>
              <td>{event.description}</td>
            </tr>
            <tr>
              <th scope="row"><i class="fas fa-calendar-day"></i></th>
              <td>
                {event.startDate && DateTime.fromJSDate(event.startDate.toDate()).toFormat('ff')}
                <span className='mx-2'>-</span>
                {event.endDate && DateTime.fromJSDate(event.endDate.toDate()).toFormat('ff')}
              </td>
            </tr>
            <tr>
              <th scope="row"><i class="fas fa-map-marked-alt"></i></th>
              <td>
                {event.location}
                <br/>
                <button 
                  type="button" 
                  class="btn btn-outline-dark rounded-0 mt-2 font-weight-bold"
                  onClick={this.showMapToggle}
                >
                  {this.state.showMap ? 'Hide Map' : 'Show Map'}
                </button>
              </td>
            </tr>
          </tbody>      
        </table>
        {this.state.showMap && 
          <EventDetailMap 
            venuelatlng={event.latlng}
          />
        }
      </div>
    )
  }
}

export default EventDetailInfo
