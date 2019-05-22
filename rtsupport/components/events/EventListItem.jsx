import React, { Component } from 'react'
import { connect } from 'react-redux'
import { isEmpty, firebaseConnect, withFirestore } from 'react-redux-firebase'
import { compose } from 'redux'
import { LinkContainer } from 'react-router-bootstrap'
import { DateTime } from "luxon";
import EventPosters from './EventPosters.jsx'
import { createDataTree, objToArray } from '../../app/common/util/shapers.js'

const mapState = (state, ownProps) => {
  return {
    eventChat: 
      !isEmpty(state.firebase.data.event_chat) &&
      objToArray(state.firebase.data.event_chat[ownProps.event.id]),
  }
}

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
  render() {
    const {eventChat, opts, events, fba, event} = this.props;
    const convertedAttendees = event && event.attendees && objToArray(event.attendees)  
    const total = opts ? opts : events && events.length
    const chatTree = !isEmpty(eventChat) && createDataTree(eventChat.reverse())    
    return (
      <div className='card border-0 rounded-0 mb-2'>
        <div className='card-body transbox py-0 px-3'>
          <table class="table">
            <tbody>
              <tr className='h6'>
                <th scope="row" className='text-right border-0'>
                  <a href={`/profile/${event.hostUid}`}>
                    <img src={event.hostAvatarUrl} className="hoster" alt="..."/>
                  </a>
                </th>
                <td className='border border-0'>
                  {
                    fba.uid == event.hostUid &&
                    <h5 className='d-inline mr-2'>
                      <a href="#" class="badge badge-dark rounded-0 mb-2">HOST</a>
                    </h5>                                      
                  }                
                  {
                    event.status == 0 && event.endDate && typeof event.endDate === 'object' && 
                    DateTime.fromJSDate(event.endDate.toDate()) > DateTime.local() &&
                    <h5 className='d-inline mr-2'>
                      <span class="badge active-tag rounded-0 mb-2">ACTIVE</span>
                    </h5>
                  }
                  {
                    event.status == 0 && event.endDate && typeof event.endDate === 'object' && 
                    DateTime.fromJSDate(event.endDate.toDate()) < DateTime.local() &&
                    <h5 className='d-inline mr-2'>
                      <span class="badge badge-secondary rounded-0 mb-2">PAST</span>
                    </h5>
                  }
                  {
                    event.status == 1 && 
                    <h5 className='d-inline mr-2'>
                      <span class="badge canceled-tag rounded-0 mb-2">CANCELED</span>
                    </h5>
                  }
                  <h4><a href={`/events/${event.id}`} className='edh-a'>{event.title}</a></h4>
                  <h5>
                    {event.permission == 0 && <span><i class="fas fa-globe mr-2"></i>Public</span>}
                    {event.permission == 1 && <span><i class="fas fa-lock mr-2"></i>Private</span>}
                    <strong> · </strong>
                    Hosted by <a href={`/profile/${event.hostUid}`} className='edh-a'>{event.hostedBy}</a>
                  </h5>
                  <small className='text-000 font-weight-bold'>Created {DateTime.fromJSDate(event.createdAt.toDate()).toFormat('FF')}</small>
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
                  <span className='mr-2'>
                    {convertedAttendees && convertedAttendees.length} Going
                  </span>
                  <span className='mx-2'>
                    {
                      chatTree 
                        ? chatTree.length > 1 
                            ? chatTree.length + ' Comments' 
                            : chatTree.length + ' Comment' 
                        : '0 Comment'
                    }
                  </span>
                  <span className='mx-2'>-- Views</span>
                  <span className='mx-2'>-- Likes</span>
                  <span className='mx-2'>-- Shares</span>
                  <span className='mx-2'>-- Save</span>
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
              className="btn btn-outline-light l-btn btn-lg rounded-0 font-weight-bold py-0 w-100">
              VIEW
            </button>        
          </LinkContainer>
          <hr class="hr-text mb-0 mt-2" data-content={`${this.props.index+1}/${total}`}/>
        </div>
      </div>
    )
  }
}

export default compose(
  connect(mapState, null),
  firebaseConnect((props) => ([`event_chat/${props.event.id}`])),
)(EventListItem)
