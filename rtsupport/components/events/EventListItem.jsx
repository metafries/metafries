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
      <div className='card border-0 rounded-0 mb-3'>
        <div class="card-header p-0 bg-white">
          <table class="table mb-0">
            <tbody>
              <tr>
                <th scope="row" className='border-0 float-right px-0'>
                  <img src={event.hostAvatarUrl} className="hoster" alt="..."/>
                </th>
                <td className='border-0'>
                  <h3 className='mb-0'>{event.hostedBy}</h3>
                  <small className='font-weight-bold h6'>
                    {DateTime.fromJSDate(event.createdAt.toDate()).toFormat('FF')}
                    <strong> · </strong>CREATED A
                    {event.permission == 0 && <span className='mx-1'>PUBLIC</span>}
                    {event.permission == 1 && <span className='mx-1'>PRIVATE</span>}
                    <a href={`/events/${event.id}`}>EVENT</a>
                  </small>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {event.posters && <EventPosters event={event} />}
        <div className='card-body transbox pb-0'>
          <h4>
            {event.title}
          </h4>
          <h5 className='mb-4'>
            -- views
            <strong> · </strong>
            {event.permission == 0 && <span><i class="fas fa-globe mr-2"></i>Public</span>}
            {event.permission == 1 && <span><i class="fas fa-lock mr-2"></i>Private</span>}
            <strong> · </strong>
            Hosted by <a href='#' className='edh-a'>{event.hostedBy}</a>
          </h5>
          <table class="table">
            <tbody>
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
            </tbody>      
          </table>
          {
              fba.uid == event.hostUid &&
              <h5 className='mb-2'><a href="#" class="badge badge-dark rounded-0 mr-2">HOST</a></h5>
          }                  
        </div>  
        <div class="card-footer transbox rounded-0">
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
