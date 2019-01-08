import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'

const Menu = () => {
  return (
    <div className="btn-group-vertical w-100">
        <div className='menu-header mb-2'>/ USER (GROUP) / EVENT</div>
        <LinkContainer to='/modify/:id/about'>
          <button type="button" className="btn btn-lg btn-outline-dark rounded-0 border-dark font-weight-bold text-left px-2 my-1"><i class="fas fa-minus mr-2"></i>ABOUT</button>        
        </LinkContainer>
        <LinkContainer to='/modify/:id/attendees'>
          <button type="button" className="btn btn-lg btn-outline-dark rounded-0 border-dark font-weight-bold text-left px-2 my-1"><i class="fas fa-minus mr-2"></i>ATTENDEES</button>
        </LinkContainer>
    </div>
  )
}

export default Menu
