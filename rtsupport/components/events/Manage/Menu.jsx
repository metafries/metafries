import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'

const Menu = ({event}) => {
    return (
        <div className="btn-group-vertical w-100 mb-4">
            <div className='menu-header mb-4'>
                <table class="table mb-0">
                    <tbody>
                        <tr>
                            <th scope="row" className='border-0 float-right p-0'>
                                <a href={`/profile/${event.hostUid}`}>
                                    <img src={event.hostAvatarUrl} className="hoster rounded mr-3" alt="..."/>                                
                                </a>
                            </th>
                            <td className='border-0 p-0'>
                                <a href={`/profile/${event.hostUid}`}>{event.hostedBy}</a>
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
        </div>
    )        
}

export default Menu
