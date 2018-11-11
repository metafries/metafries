import React, { Component } from 'react'
import SearchEvent from './SearchEvent.jsx'
import CreateEvent from './CreateEvent.jsx'
import InstantMsg from './InstantMsg.jsx'

class DashBoard extends Component {
  render() {
    return (
      <div className='col-lg-4'>
        <div class="accordion" id="accordionExample">
            <SearchEvent/>
            <CreateEvent/>
            <InstantMsg/>
        </div>
        </div>
    )
  }
}

export default DashBoard