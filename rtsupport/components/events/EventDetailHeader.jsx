import React from 'react'

const EventDetailHeader = ({event}) => {
  return (
    <div class="card mb-3 rounded-0">
      <div className='card-body transbox'>
        <table class="table">
          <tbody>
            <tr>
              <th scope="row" className='border-0'>
                <img src={event.hostPhotoURL} className="contact float-right" alt="..."/>
              </th>
              <td className='border-0'>
                <h2>{event.title}</h2>
                <h4 className='mb-0'>
                  <i class="fas fa-globe mr-2"></i>Public<strong> · </strong>
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
      <div id={event.id} class="carousel slide" data-ride="carousel" data-interval="2000">
        <ol class="carousel-indicators">
          <li data-target={`#${event.id}`} data-slide-to="0" class="active"></li>
          <li data-target={`#${event.id}`} data-slide-to="1"></li>
          <li data-target={`#${event.id}`} data-slide-to="2"></li>
        </ol>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img class="d-block w-100" src="/static/images/IMG_20180706_185041.jpg" alt="First slide"/>
          </div>
          <div class="carousel-item">
            <img class="d-block w-100" src="/static/images/IMG_20180706_185041.jpg" alt="Second slide"/>
          </div>
          <div class="carousel-item">
            <img class="d-block w-100" src="/static/images/IMG_20180706_185041.jpg" alt="Third slide"/>
          </div>
          <a class="carousel-control-prev" href={`#${event.id}`} role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a class="carousel-control-next" href={`#${event.id}`} role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>          
        </div>
      </div>
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