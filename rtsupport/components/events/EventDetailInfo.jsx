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
        <table class="table">
          <tbody>
            {
              event.description && event.description.length > 1 &&
              <tr>
                <th scope="row" className='px-0'><i class="fas fa-info ml-3"></i></th>
                <td className='px-3'>{event.description}</td>
              </tr>
            }
            <tr>
              <th scope="row" className='px-0'><i class="fas fa-calendar-day ml-3"></i></th>
              <td className='px-3'>
                {
                  event.startDate && event.startDate.seconds &&
                  DateTime.fromJSDate(event.startDate.toDate()).toFormat('ff')
                }
                <span className='mx-2'>-</span>
                {
                  event.endDate && event.endDate.seconds &&
                  DateTime.fromJSDate(event.endDate.toDate()).toFormat('ff')
                }
              </td>
            </tr>
            <tr>
              <th scope="row" className='px-0'><i class="fas fa-map-marked-alt ml-3"></i></th>
              <td className='px-3'>
                {event.location}
                <br/>
                <button 
                  type="button" 
                  class="btn btn-outline-dark l-btn wl-btn rounded-0 mt-2 font-weight-bold px-2"
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
