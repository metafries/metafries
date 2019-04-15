import React, { Component } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { DateTime } from "luxon";
import EventPosters from './EventPosters.jsx'

class EventListItem extends Component {
  state = {
    events: this.props.events
  }
  handleEditEvent = (updateEvent) => {
    this.setState({
      events: this.state.events.map(e => {
        if (e.id === updateEvent.id) {
          return Object.assign({}, updateEvent)
        } else {
          return e
        }
      })
    })
  }
  getDeleteEventId = (cancelEvent) => {
    this.props.onDeleteEvent(cancelEvent.id)
  }
  render() {
    const {fba, event} = this.props;
    return (
      <div className='card border-0 rounded-0 mb-2'>
        <div className='card-body transbox py-0 px-3'>
          <table class="table">
            <tbody>
              <tr className='h6'>
                <th scope="row" className='text-right border-0'>
                  <a href='#'><img src={event.hostAvatarUrl} className="hoster" alt="..."/></a>
                </th>
                <td className='border border-0'>
                  {
                    fba.uid == event.hostUid &&
                    <h5><a href="#" class="badge badge-dark rounded-0">HOST</a></h5>                                      
                  }
                  <h4>{event.title}</h4>
                  <h5>
                    {event.permission == 0 && <span><i class="fas fa-globe mr-2"></i>Public</span>}
                    {event.permission == 1 && <span><i class="fas fa-lock mr-2"></i>Private</span>}
                    <strong> · </strong>
                    Hosted by <a href='#' className='edh-a'>{event.hostedBy}</a>
                  </h5>
                  <small className='text-000 font-weight-bold'>CREATED AT {DateTime.fromJSDate(event.createdAt.toDate()).toFormat('FF')}</small>
                </td>
              </tr>
              <tr className='h6'>
                <th scope="row" className='text-right'>VENUE</th>
                <td>{event.location}</td>
              </tr>
              <tr className='h6'>
                <th scope="row" className='text-right'>SCHEDULE</th>
                <td>
                  {DateTime.fromJSDate(event.startDate.toDate()).toFormat('ff')}
                  <span className='mx-2'>-</span>
                  {DateTime.fromJSDate(event.endDate.toDate()).toFormat('ff')}
                </td>
              </tr>
              <tr className='h6'>
                <th scope="row" className='text-right'>TRENDS</th>
                <td>
                  <span className='mr-2'>-- Views</span>
                  <span className='mr-2'>-- Likes</span>
                  <span className='mr-2'>-- Going</span>
                  <span className='mr-2'>-- Shares</span>
                  <span className='mr-2'>-- Save</span>
                  <span className='mr-2'>-- Comments</span>
                </td>
              </tr>
            </tbody>      
          </table>
        </div>  
        {event.posters && <EventPosters event={event} />}
        <div class="card-footer transbox rounded-0 px-3">
          <LinkContainer to={`/events/${event.id}`}>
            <button 
              type="button" 
              className="btn btn-outline-light btn-lg rounded-0 font-weight-bold py-0 w-100">
              VIEW
            </button>        
          </LinkContainer>
        </div>
      </div>
    )
  }
}

export default EventListItem
