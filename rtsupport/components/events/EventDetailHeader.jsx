import React from 'react'

const EventDetailHeader = () => {
  return (
    <div className='card mb-3 rounded-0 border-white'>
      <div className='card-header rounded-0 event-detail-header p-0'>
        <div className='transbox m-0 p-2'>
          <h1 className='card-title mb-1'>Drinks in the pub</h1>
          <p className='mb-1'><i class="far fa-clock"></i> 2018/03/28, 14:00 - 2018/03/29, 11:00</p>
          <p className='mb-1'><i class="fas fa-map-marker-alt"></i> British Airways i360</p>
          <p><i class="fas fa-home"></i> Hosted by <strong>Tom</strong></p>        
        </div>
      </div>
      <div className='card-body rounded-0 px-0 pt-1'>
        <button 
          type="button" 
          class="btn btn-dark rounded-0 text-ddc213 font-weight-bold w-100 mb-1 text-right">
          <i class="fas fa-fire"></i> Like | 4,957,524
        </button>
        <button 
          type="button" 
          class="btn btn-dark rounded-0 text-ddc213 font-weight-bold w-100 text-right">
          <i class="fas fa-check"></i> Going | 2
        </button>
      </div>
    </div>
  )
}

export default EventDetailHeader

  //  <Segment.Group>
  //     <Segment basic attached="top" style={{ padding: '0' }}>
  //       <Image src="/assets/categoryImages/drinks.jpg" fluid />

  //       <Segment basic>
  //         <Item.Group>
  //           <Item>
  //             <Item.Content>
  //               <Header
  //                 size="huge"
  //                 content="Event Title"
  //                 style={{ color: 'white' }}
  //               />
  //               <p>Event Date</p>
  //               <p>
  //                 Hosted by <strong>Hosted by</strong>
  //               </p>
  //             </Item.Content>
  //           </Item>
  //         </Item.Group>
  //       </Segment>
  //     </Segment>

  //     <Segment attached="bottom">
  //       <Button>Cancel My Place</Button>
  //       <Button color="teal">JOIN THIS EVENT</Button>

  //       <Button color="orange" floated="right">
  //         Manage Event
  //       </Button>
  //     </Segment>
  //   </Segment.Group>