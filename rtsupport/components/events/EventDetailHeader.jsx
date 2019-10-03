import React, { Component } from 'react'
import { DateTime } from "luxon";
import EventPosters from './EventPosters.jsx'
import { TOGGLE_ON, TOGGLE_OFF } from './eventConstants.jsx'

class EventDetailHeader extends Component {
  handleSaveToggle = async() => {
    const {saved, event} = this.props
    if (saved) {
      try {
        await this.props.saveToggleOff(event)        
      } finally {
        window.location.reload()
      }
    } else {
      this.props.saveToggleOn(event)
    }
  }
  handleLikeToggle = async() => {
    const {liked, event} = this.props
    if (liked) {
      try {
        await this.props.likeToggleOff(event)
      } finally {
        window.location.reload()        
      }      
    } else {
      this.props.likeToggleOn(event)      
    }
  }
  handleGoingToggle = async() => {
    const {isGoing, event} = this.props
    if (isGoing) {
      try {
        await this.props.goingToggleOff(event)        
      } finally {
        window.location.reload()
      }
    } else {
      this.props.goingToggleOn(event)      
    }
  }
  render() {
    const {processing, deletePoster, setToMain, likeList, saved, liked, isGoing, isHost, fba, event} = this.props
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
                      <button class="badge badge-dark rounded-0 mb-2">HOST</button>
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
                  <h4>{event.title}</h4>
                  <h5>
                    {event.permission === 0 && <span><i class="fas fa-globe mr-2"></i>Public</span>}
                    {event.permission === 1 && <span><i class="fas fa-lock mr-2"></i>Private</span>}
                    <strong> · </strong>
                    Hosted by <a href={`/profile/${event.hostUid}`} className='edh-a'>{event.hostedBy}</a>
                  </h5>
                  <h6 className='text-000 font-weight-bold mb-4'>Created at {DateTime.fromJSDate(event.createdAt.toDate()).toFormat('FF')}</h6>
                  <h5 className='eds-a font-weight-bold text-white'>
                    {likeList ? likeList.length : 0}
                    <span className='ml-2'>Liked</span>
                  </h5>
                  <h5 className='eds-a font-weight-bold text-white mb-0'>-- Shares</h5>
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
        {
          event.posters && 
          <EventPosters 
            processing={processing} 
            deletePoster={deletePoster}
            setToMain={setToMain} 
            isHost={isHost} 
            event={event}
          />
        }
        <table class="table transbox m-0">
          <thead>
            <tr>
              <th 
                scope="col" 
                className=
                  {
                    liked 
                      ? TOGGLE_ON 
                      : authenticated ? TOGGLE_OFF : TOGGLE_OFF + ' disabled'
                  }
                >
                <button 
                  onClick={this.handleLikeToggle} 
                  type='button' 
                  className='edh-b font-weight-bold'
                  >
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
              <th 
                scope="col" 
                className=
                {
                  saved ? TOGGLE_ON
                        : authenticated ? TOGGLE_OFF 
                                        : TOGGLE_OFF + ' disabled'
                }
                >
                <button 
                  onClick={this.handleSaveToggle}
                  type='button' 
                  className='edh-b font-weight-bold'
                  >
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