import React, { Component } from 'react'

class EventListItem extends Component {
  render() {
    return (
      <div className='support card border-dark rounded-0 mb-3 mx-4'>
        <div className='card-header border-dark rounded-0 bg-white'>
          <img src="./static/images/whazup-square-logo.png" class="hoster rounded-circle float-left" alt="..."/>
          <strong className='ml-3'>
            Event Title
          </strong>
          <br/>
          <small className='ml-3'>Hosted by <a href='#'>Cashviar</a></small>
      </div>
        <div className='card-body channels'>
          <strong>Event Body</strong>
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