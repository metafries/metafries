import React from 'react'

const EventDetailSidebar = () => {
  return (
    <table class="table">
      <thead>
        <tr className='h4'>
          <th scope="col"><i class="fas fa-user-check"></i></th>
          <th scope="col">2 Attendees</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row" className='contact px-0'>
            <img src='/static/images/whazup-square-logo.png' className="contact rounded-circle" alt="..."/>
          </th>
          <td>
            <strong>Elliot Fu</strong><br/>
            <small>41 minutes ago</small>
          </td>
          <td className='pr-0'>
            <button 
              type="button" 
              class="btn btn-dark rounded-0 font-weight-bold text-ddc213 float-right">
              <i class="fas fa-user-plus"></i>
            </button>           
          </td>
        </tr>
        <tr>
          <th scope="row" className='contact px-0'>
            <img src='/static/images/whazup-square-logo.png' className="contact rounded-circle" alt="..."/>
          </th>
          <td>
            <strong>Joe Henderson</strong><br/>
            <small>5 minutes ago</small>
          </td>
          <td className='pr-0'>
            <button 
              type="button" 
              class="btn btn-dark rounded-0 font-weight-bold text-ddc213 float-right">
              <i class="fas fa-user-plus"></i>
            </button>           
          </td>
        </tr>
      </tbody>      
    </table>
  )
}

export default EventDetailSidebar
  //  <div>
  //     <Segment
  //       textAlign="center"
  //       style={{ border: 'none' }}
  //       attached="top"
  //       secondary
  //       inverted
  //       color="teal"
  //     >
  //       2 People Going
  //     </Segment>
  //     <Segment attached>
  //       <List relaxed divided>
  //         <Item style={{ position: 'relative' }}>
  //           <Label
  //             style={{ position: 'absolute' }}
  //             color="orange"
  //             ribbon="right"
  //           >
  //             Host
  //           </Label>
  //           <Item.Image size="tiny" src="/assets/user.png" />
  //           <Item.Content verticalAlign="middle">
  //             <Item.Header as="h3">
  //               <a>Attendee Name</a>
  //             </Item.Header>
  //           </Item.Content>
  //         </Item>
  //       </List>
  //     </Segment>
  //   </div>