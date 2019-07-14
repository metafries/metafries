import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'

const Menu = ({fbp, event}) => {
    return (
        <div className="btn-group-vertical w-100 mb-4">
            <div className='menu-header mb-3'>
                <table class="table mb-0">
                    <tbody>
                        <tr>
                            <td className='border-0 p-0 h4 font-weight-bold'>
                                <a href={`/profile/${event.hostUid}`}>{fbp.profileName}</a>
                                <span className='ml-2'>/ <a href={`/events/${event.id}`}>{event.title}</a></span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <LinkContainer to={`/manage/events/${event.id}/info`}>
              <button type="button" className="btn btn-lg btn-outline-dark rounded-0 border-dark font-weight-bold text-left px-2 my-1"><i class="fas fa-minus mr-2"></i>OPTIONS</button>        
            </LinkContainer>
            <LinkContainer to={`/manage/events/${event.id}/attendees`}>
              <button type="button" className="btn btn-lg btn-outline-dark rounded-0 border-dark font-weight-bold text-left px-2 my-1"><i class="fas fa-minus mr-2"></i>ATTENDEES</button>
            </LinkContainer>
            <LinkContainer to={`/manage/events/${event.id}/status`}>
              <button type="button" className="btn btn-lg btn-outline-dark rounded-0 border-dark font-weight-bold text-left px-2 my-1"><i class="fas fa-minus mr-2"></i>STATUS</button>
            </LinkContainer>
        </div>
    )        
}

export default Menu
