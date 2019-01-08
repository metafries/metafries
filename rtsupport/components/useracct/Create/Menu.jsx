import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'

const Menu = () => {
  return (
    <div className="btn-group-vertical w-100">
        <div className='menu-header mb-2'>/ CREATE</div>
        <LinkContainer to='/new/event'>
          <button type="button" className="btn btn-lg btn-outline-dark rounded-0 border-dark font-weight-bold text-left px-2 my-1"><i class="fas fa-minus mr-2"></i>EVENT</button>        
        </LinkContainer>
        <LinkContainer to='/new/group'>
          <button type="button" className="btn btn-lg btn-outline-dark rounded-0 border-dark font-weight-bold text-left px-2 my-1"><i class="fas fa-minus mr-2"></i>GROUP</button>
        </LinkContainer>
    </div>
  )
}

export default Menu
