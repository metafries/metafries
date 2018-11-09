import React, { Component } from 'react'

class EventListItem extends Component {
  render() {
    return (
      <div className='card border-dark rounded-0 mb-3 mx-4'>
        <div className='card-header border-dark rounded-0 bg-white'>
          <img src="./static/images/whazup-square-logo.png" class="hoster rounded float-left" alt="..."/>
          <div className='d-inline float-left'>
            <strong className='ml-3'>Event Title</strong><br/>
            <i class="far fa-clock ml-3"></i> Date
            <i class="fas fa-map-marker-alt ml-2"></i> Location<br/>
            <span className='ml-3'>Hosted by <a href='#'>Cashviar</a></span>                    
          </div>
        </div>
        <div className='card-body'>
          <strong className='d-block mb-2'>3 people are going</strong>
          <img src="./static/images/whazup-square-logo.png" class="attendee rounded-circle mr-1" alt="..."/>
          <img src="./static/images/whazup-square-logo.png" class="attendee rounded-circle mr-1" alt="..."/>
          <img src="./static/images/whazup-square-logo.png" class="attendee rounded-circle mr-1" alt="..."/>        
          <h5 class="card-title mt-2">Special title treatment</h5>
          <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>   
          <button type="button" class="btn btn-outline-dark rounded-0">More...</button>      
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