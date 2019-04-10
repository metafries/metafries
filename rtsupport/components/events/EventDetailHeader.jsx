import React from 'react'
import EventPosters from './EventPosters.jsx'

const EventDetailHeader = ({event}) => {
  return (
    <div class="card mb-3 rounded-0">
      <div className='card-body transbox'>
        <table class="table">
          <tbody>
            <tr>
              <th scope="row" className='border-0'>
                <img src={event.hostAvatarUrl} className="contact float-right" alt="..."/>
              </th>
              <td className='border-0'>
                <h2>{event.title}</h2>
                <h4 className='mb-0'>
                  {event.permission == 0 && <span><i class="fas fa-globe mr-2"></i>Public</span>}
                  {event.permission == 1 && <span><i class="fas fa-lock mr-2"></i>Private</span>}
                  <strong> · </strong>
                  Hosted by <a href='#' className='edh-a'>{event.hostedBy}</a>
                </h4>
              </td>
            </tr>
          </tbody>      
        </table>
        <hr className='edh-h'/>
        <a 
          role="button" 
          class="btn btn-outline-light btn-lg rounded-0 font-weight-bold py-0 w-100" 
          href={`/manage/events/${event.id}`}
        >
          MANAGE
        </a>
      </div>  
      {event.posters && <EventPosters event={event}/>}
      <table class="table transbox m-0">
        <thead>
          <tr>
            <th scope="col" className='text-center w-25'>
              <button type='button' className='edh-b font-weight-bold'>
                <i class="fas fa-fire"></i><br/>Like
              </button>
            </th>
            <th scope="col" className='text-center w-25'>
              <button type='button' className='edh-b font-weight-bold'>
                <i class="fas fa-check"></i><br/>Going
              </button>
            </th>
            <th scope="col" className='text-center w-25'>
              <button type='button' className='edh-b font-weight-bold'>
                <i class="fas fa-share"></i><br/>Share
              </button>
            </th>
            <th scope="col" className='text-center w-25'>
              <button type='button' className='edh-b font-weight-bold'>
                <i class="fas fa-bookmark"></i><br/>Save
              </button>
            </th>
          </tr>
        </thead>
      </table>      
    </div>
  )
}

export default EventDetailHeader