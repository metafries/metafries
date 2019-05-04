import React, { Component } from 'react'

class Attended extends Component {
  render() {
    const {fba, fbp} = this.props  
    const isCurrentUser = fba.uid === fbp.id  
    return (
      <div>
        <div class="input-group mb-2 px-3">
          <input 
            type="text" 
            class="form-control form-control-lg rounded-0 border-left-0 border-top-0 border-right-0 mr-2 font-weight-bold search-bar"
            placeholder='Sup? Search Events ...'
          />
          <div class="input-group-append">
            <button class="btn btn-link rounded-0 py-0 pl-2 pr-1 text-000 search-icon" type="button">
              <i class="fas fa-search h4"></i>
            </button>
          </div>
        </div>
        <h6 className='info-text-box mb-3 mx-3 p-2'>
          <i class="fas fa-info-circle mr-2"></i>
          The searching results are now limited to events that
          {
            isCurrentUser 
            ? <span className='mx-1'>you have</span> 
            : <span className='mx-1'>{fbp.displayName} has</span>
          }
          attended.
        </h6>
        <h6 className='info-text-box mb-3 p-2 mx-3'>
          <i class="fas fa-info-circle mr-2"></i>
          Haven't attended any events yet.
        </h6>
      </div>
    )
  }
}

export default Attended