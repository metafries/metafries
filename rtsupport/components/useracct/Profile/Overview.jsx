import React, { Component } from 'react'

class Overview extends Component {
  render() {
    return (
      <div class="col-lg-5 px-3">
        <h3 className='mb-0 font-weight-bold'>1 Group</h3>
        <hr/>
        <img className='signout mb-3' src='/static/images/whazup-square-logo.png'/>
        <h3 className='mb-0 font-weight-bold'>0 Hosting</h3>
        <hr/>
        <h6 className='info-text-box mb-3 p-2'>
          <i class="fas fa-info-circle mr-2"></i>
          Not hosting any events yet.
        </h6>
        <h3 className='mb-0 font-weight-bold'>0 Going</h3>
        <hr/>
        <h6 className='info-text-box mb-3 p-2'>
          <i class="fas fa-info-circle mr-2"></i>
          Not going any events yet.
        </h6>
        <h3 className='mb-0 font-weight-bold'>0 Liked</h3>
        <hr/>
        <h6 className='info-text-box mb-3 p-2'>
          <i class="fas fa-info-circle mr-2"></i>
          Haven't liked any events yet.
        </h6>
        <h3 className='mb-0 font-weight-bold'>0 Attended</h3>
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