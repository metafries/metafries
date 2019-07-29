import React, { Component } from 'react'
import { DateTime } from "luxon";
import EventPosters from './EventPosters.jsx'
import { TOGGLE_ON, TOGGLE_OFF } from './eventConstants.jsx'

class EventDetailHeader extends Component {
  handleGoingToggle = async() => {
    const {isGoing, event} = this.props
    if (isGoing) {
      try {
        await this.props.goingToggleOff(event)        
      } finally {
        location.reload()
      }
    } else {
      this.props.goingToggleOn(event)      
    }
  }
  render() {
    const {isGoing, isHost, fba, event} = this.props
    const authenticated = fba.isLoaded && !fba.isEmpty
    const today = new Date()
    return (
      <div class="card mb-3 rounded-0">
        <div className='card-body transbox px-3 pb-0'>
          <table class="table mb-0">
            <tbody>
              <tr>
                <th scope="row" className='border-0'>
                  <a href={`/profile/${event.hostUid}`}>
                    <img src={event.hostAvatarUrl} className="hoster float-right" alt="..."/>
                  </a>
                </th>
                <td className='border-0'>
                  {
                    fba.uid === event.hostUid &&
                    <h5 className='d-inline mr-2'>
                      <a href="#" class="badge badge-dark rounded-0 mb-2">HOST</a>
                    </h5>
                  }
                  {
                    event.startDate && typeof event.startDate === 'object' &&
                    event.startDate.toDate().toDateString() === today.toDateString() &&
                    <h5 className='d-inline mr-2'>
                      <span class="badge today-tag rounded-0 mb-2">TODAY</span>
                    </h5>                      
                  }
                  {
                    event.status === 0 && 
                    event.endDate && typeof event.endDate === 'object' && 
                    DateTime.fromJSDate(event.endDate.toDate()) > DateTime.local() &&
                    <h5 className='d-inline mr-2'>
                      <span class="badge active-tag rounded-0 mb-2">ACTIVE</span>
                    </h5>
                  }
                  {
                    event.status === 0 && event.endDate && typeof event.endDate === 'object' && 
                    DateTime.fromJSDate(event.endDate.toDate()) < DateTime.local() &&
                    <h5 className='d-inline mr-2'>
                      <span class="badge badge-secondary rounded-0 mb-2">PAST</span>
                    </h5>
                  }
                  {
                    event.status === 1 && 
                    <h5 className='d-inline mr-2'>
                      <span class="badge canceled-tag rounded-0 mb-2">CANCELED</span>
                    </h5>
                  }
                  <h3>{event.title}</h3>
                  <h5 className='mb-0'>
                    {event.permission === 0 && <span><i class="fas fa-globe mr-2"></i>Public</span>}
                    {event.permission === 1 && <span><i class="fas fa-lock mr-2"></i>Private</span>}
                    <strong> · </strong>
                    Hosted by <a href={`/profile/${event.hostUid}`} className='edh-a'>{event.hostedBy}</a>
                    <hr className='my-3'/>
                    <a href='#' role='button' className='eds-a font-weight-bold text-white'>-- Likes</a>
                    <hr className='my-1'/>
                    <a href='#' role='button' className='eds-a font-weight-bold text-white'>-- Shares</a>
                  </h5>
                </td>
              </tr>
            </tbody>      
          </table>
          <hr className='edh-h mt-0'/>
          {
            isHost &&
            <a 
              role="button" 
              class="btn btn-outline-warning l-btn btn-lg rounded-0 font-weight-bold py-0 w-100 mb-3" 
              href={`/manage/events/${event.id}`}
              >
              MANAGE
            </a>
          }
        </div>  
        {event.posters && <EventPosters event={event}/>}
        <table class="table transbox m-0">
          <thead>
            <tr>
              <th scope="col" className={authenticated ? TOGGLE_OFF : TOGGLE_OFF + ' disabled'}>
                <button type='button' className='edh-b font-weight-bold'>
                  <i class="fas fa-fire"></i><br/>Like
                </button>
              </th>
              <th 
                scope="col" 
                className=
                  {
                    event.status === 0 && event.endDate && typeof event.endDate === 'object' && 
                    DateTime.fromJSDate(event.endDate.toDate()) > DateTime.local()
                      ? isGoing 
                        ? isHost 
                          ? TOGGLE_ON + ' disabled' 
                          : TOGGLE_ON 
                        : authenticated 
                          ? TOGGLE_OFF 
                          : TOGGLE_OFF + ' disabled'
                      : isGoing 
                        ? TOGGLE_ON + ' disabled'
                        : TOGGLE_OFF + ' disabled'
                  }                
                >
                <button 
                  onClick={this.handleGoingToggle} 
                  type='button' 
                  className='edh-b font-weight-bold'
                  >
                  <i class="fas fa-check"></i><br/>Going
                </button>
              </th>
              <th scope="col" className='text-center w-25'>
                <button type='button' className='edh-b font-weight-bold'>
                  <i class="fas fa-share"></i><br/>Share
                </button>
              </th>
              <th scope="col" className={authenticated ? TOGGLE_OFF : TOGGLE_OFF + ' disabled'}>
                <button type='button' className='edh-b font-weight-bold'>
                  <i class="fas fa-bookmark"></i><br/>Save
                </button>
              </th>
            </tr>
          </thead>
        </table>      
      </div>
    )
  }
}

export default EventDetailHeader