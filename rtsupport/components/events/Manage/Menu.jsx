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
                                <img src={event.hostAvatarUrl} className="contact rounded-0 my-2 mr-2" alt="..."/>
                            </th>
                            <td className='border-0 p-0'>
                                <a href='#'>{event.hostedBy}</a>
                                    <span className='mx-2'>/</span>
                                <a href={`/events/${event.id}`}>{event.title}</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <LinkContainer to={`/manage/events/${event.id}/info`}>
              <button type="button" className="btn btn-lg btn-outline-dark rounded-0 border-dark font-weight-bold text-left px-2 my-1"><i class="fas fa-minus mr-2"></i>INFO</button>        
            </LinkContainer>
            <LinkContainer to={`/manage/events/${event.id}/attendees`}>
              <button type="button" className="btn btn-lg btn-outline-dark rounded-0 border-dark font-weight-bold text-left px-2 my-1"><i class="fas fa-minus mr-2"></i>ATTENDEES</button>
            </LinkContainer>
        </div>
    )        
}

export default Menu
