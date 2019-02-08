import React, { Component } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { DateTime } from "luxon";

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
    const {event} = this.props;
    return (
      <div className='card border-dark rounded-0 mb-3'>
        <div id={event.id} class="carousel slide" data-ride="carousel" data-interval="2000">
          <ol class="carousel-indicators">
            <li data-target={`#${event.id}`} data-slide-to="0" class="active"></li>
            <li data-target={`#${event.id}`} data-slide-to="1"></li>
            <li data-target={`#${event.id}`}data-slide-to="2"></li>
          </ol>
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img class="d-block w-100" src="/static/images/IMG_20180706_185041.jpg" alt="First slide"/>
            </div>
            <div class="carousel-item">
              <img class="d-block w-100" src="/static/images/IMG_20180706_185041.jpg" alt="Second slide"/>
            </div>
            <div class="carousel-item">
              <img class="d-block w-100" src="/static/images/IMG_20180706_185041.jpg" alt="Third slide"/>
            </div>
            <a class="carousel-control-prev" href={`#${event.id}`} role="button" data-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href={`#${event.id}`} role="button" data-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="sr-only">Next</span>
            </a>          
          </div>
        </div>
        <div className='card-body transbox pb-0'>
          <table class="table">
            <tbody>
              <tr>
                <th scope="row" className='border-0'>
                  <img src={event.hostPhotoURL} className="signout float-right" alt="..."/>
                </th>
                <td className='border-0'>
                  <h3>{event.title}</h3>
                  <h5>
                    {event.permission == 0 && <span><i class="fas fa-globe mr-2"></i>Public</span>}
                    {event.permission == 1 && <span><i class="fas fa-lock mr-2"></i>Private</span>}
                    <strong> · </strong>
                    Hosted by <a href='#' className='edh-a'>{event.hostedBy}</a>
                  </h5>
                </td>
              </tr>
              <tr className='h6'>
                <th scope="row" className='text-right'>VENUE</th>
                <td>{event.location}</td>
              </tr>
              <tr className='h6'>
                <th scope="row" className='text-right'>DATE, TIME</th>
                <td>
                  {DateTime.fromJSDate(event.startDate.toDate()).toFormat('yyyy/MM/dd, HH:mm')}
                  <span className='mx-2'>-</span>
                  {DateTime.fromJSDate(event.endDate.toDate()).toFormat('yyyy/MM/dd, HH:mm')}
                </td>
              </tr>
            </tbody>      
          </table>
        </div>  
        <div class="card-footer transbox">
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
