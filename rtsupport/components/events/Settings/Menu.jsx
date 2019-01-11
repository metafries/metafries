import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'

const Menu = ({event}) => {
    return (
        <div className="btn-group-vertical w-100 mb-4">
            <div className='menu-header mb-2'>/ EDIT \ SETTINGS</div>
            <LinkContainer to={`/mod/events/${event.id}/info`}>
              <button type="button" className="btn btn-lg btn-outline-dark rounded-0 border-dark font-weight-bold text-left px-2 my-1"><i class="fas fa-minus mr-2"></i>INFO</button>        
            </LinkContainer>
            <LinkContainer to={`/mod/events/${event.id}/attendees`}>
              <button type="button" className="btn btn-lg btn-outline-dark rounded-0 border-dark font-weight-bold text-left px-2 my-1"><i class="fas fa-minus mr-2"></i>ATTENDEES</button>
            </LinkContainer>
        </div>
    )        
}

export default Menu
