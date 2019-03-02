import React, { Component } from 'react'

class Overview extends Component {
  render() {
    return (
      <div class="col-lg-8">
        <h3 className='mb-0 font-weight-bold'>Hosting</h3>
        <hr/>
        <h6 className='info-text-box mb-3 p-2'>
          <i class="fas fa-info-circle mr-2"></i>
          Not hosting any events yet.
        </h6>
        <h3 className='mb-0 font-weight-bold'>Going</h3>
        <hr/>
        <h6 className='info-text-box mb-3 p-2'>
          <i class="fas fa-info-circle mr-2"></i>
          Not going any events yet.
        </h6>
        <h3 className='mb-0 font-weight-bold'>Liked</h3>
        <hr/>
        <h6 className='info-text-box mb-3 p-2'>
          <i class="fas fa-info-circle mr-2"></i>
          Haven't liked any events yet.
        </h6>
        <h3 className='mb-0 font-weight-bold'>Attended</h3>
        <hr/>
        <h6 className='info-text-box mb-3 p-2'>
          <i class="fas fa-info-circle mr-2"></i>
          Haven't attended any events yet.
        </h6>
      </div>
    )
  }
}

export default Overview