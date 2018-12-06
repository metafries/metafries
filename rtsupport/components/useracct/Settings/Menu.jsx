import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'

const Menu = () => {
  return (
    <div className="btn-group-vertical w-100">
        <div className='bg-dark text-ddc213 w-100 p-2 font-weight-bold'><i class="fas fa-user"></i> Personal Settings</div>
        <LinkContainer to='/settings/profile'>
          <button type="button" className="btn btn-outline-dark rounded-0 border-dark font-weight-bold text-left px-2 my-1"><i class="fas fa-minus"></i> Profile</button>        
        </LinkContainer>
        <LinkContainer to='/settings/account'>
          <button type="button" className="btn btn-outline-dark rounded-0 border-dark font-weight-bold text-left px-2 my-1"><i class="fas fa-minus"></i> Account</button>
        </LinkContainer>
    </div>
  )
}

export default Menu
