import React, { Component } from 'react'
import EventListAttendee from './EventListAttendee.jsx'
import EditEvent from '../controlpanel/EditEvent.jsx'

class EventListItem extends Component {
  render() {
    const {event} = this.props;
    return (
      <div className='card border-dark rounded-0 mb-3 mx-3'>
        <div className='card-header border-dark rounded-0 bg-white'>
          <h4 className='d-inline'>{event.title}</h4>
          <button type='button' class='btn btn-link' data-toggle="modal" data-target="#editEvent">
          <i class="fas fa-edit"></i> Edit
          </button>
          <EditEvent/><br/>
          <i class="far fa-clock"></i> {event.startDate} <i class="fas fa-minus"></i> {event.endDate}
          <i class="fas fa-map-marker-alt ml-2"></i> {event.location}
          <i class="fas fa-bolt ml-2"></i> 4,957,524<br/>   
          <small>Hosted by <a href='#'>{event.hostedBy}</a></small>
        </div>
        <div className='card-body'>
          <strong className='d-block mb-2'>2 people are going</strong>
          {event.attendees && event.attendees.map((a) => (
            <EventListAttendee key={a.id} attendee={a} />
          ))}
          <br/><br/>
          <h6 class="card-title mt-2">{event.description}</h6>
        </div>
        <div class="card-footer px-0 py-0 bg-white">
          <button type="button" class="btn btn-outline-dark rounded-0 w-50 border-dark border-left-0"><i class="fas fa-fire"></i> Like</button>
          <button type="button" class="btn btn-outline-dark rounded-0 w-50 border-dark border-left-0 border-right-0"><i class="fas fa-check"></i> Going</button>
        </div>
      </div>
    )
  }
}

export default EventListItem

    //  <Segment.Group>
    //     <Segment>
    //       <Item.Group>
    //         <Item>
    //           <Item.Image size="tiny" circular src="" />
    //           <Item.Content>
    //             <Item.Header as="a">Event Title</Item.Header>
    //             <Item.Description>
    //               Hosted by <a>hosted by</a>
    //             </Item.Description>
    //           </Item.Content>
    //         </Item>
    //       </Item.Group>
    //     </Segment>
    //     <Segment>
    //       <span>
    //         <Icon name="clock" /> date |
    //         <Icon name="marker" /> time
    //       </span>
    //     </Segment>
    //     <Segment secondary>
    //       <List horizontal>
    //         {/* todo: attendees go here */}
    //       </List>
    //     </Segment>
    //     <Segment clearing>
    //       <Button as="a" color="teal" floated="right" content="View" />
    //     </Segment>
    //   </Segment.Group>