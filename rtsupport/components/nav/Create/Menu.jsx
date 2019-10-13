import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'

const CreateMenu = ({fba, fbp}) => {
  return (
    <div className="btn-group-vertical w-100 mb-4">
        <div className='menu-header mb-2'>
          <a href={`/profile/${fba.uid}`}>{fbp.profileName}</a>
          <span className='ml-2'>/ CREATE</span>
        </div>
        <LinkContainer to='/create/event'>
          <button type="button" className="btn btn-lg btn-outline-dark rounded-0 border-dark font-weight-bold text-left px-2 my-1"><i class="fas fa-minus mr-2"></i>EVENT</button>        
        </LinkContainer>
        <LinkContainer to='/create/group'>
          <button type="button" className="btn btn-lg btn-outline-dark rounded-0 border-dark font-weight-bold text-left px-2 my-1"><i class="fas fa-minus mr-2"></i>GROUP</button>
        </LinkContainer>
    </div>
  )
}

export default CreateMenu
