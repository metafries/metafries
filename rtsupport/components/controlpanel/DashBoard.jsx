import React, { Component } from 'react'
import SearchEvent from './SearchEvent.jsx'
import CreateEvent from './CreateEvent.jsx'
import InstantMsg from './InstantMsg.jsx'

class DashBoard extends Component {
  render() {
    return (
      <div className='col-lg-4 mb-3'>
        <div class="input-group mb-3">
          <input type="text" class="form-control ml-3 border-dark rounded-0" placeholder="Sup?"/>
          <div class="input-group-append mr-3">
            <button class="btn btn-outline-dark rounded-0" type="button"><i class="fas fa-search"></i></button>
          </div>
        </div>
        <div class="accordion mx-3" id="dashboard">
          <SearchEvent/>
          <CreateEvent/>
          <InstantMsg/>
        </div>
      </div>
    )
  }
}

export default DashBoard