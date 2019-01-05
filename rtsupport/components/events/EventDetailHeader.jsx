import React from 'react'

const EventDetailHeader = ({event}) => {
  return (
    <div class="card mb-3 rounded-0">
      <div class="card-body transbox rounded-0 text-center">
        <h1 className='card-title'>{event.title}</h1>
        <h4>
          <i class="fas fa-globe mr-2"></i>Public<strong> · </strong>
          Hosted by <a className='edh-a font-weight-bold' href='#'>{event.hostedBy}</a>
        </h4>  
        <hr className='edh-h'/>
        <a role="button" class="btn btn-outline-light btn-lg rounded-0 font-weight-bold py-0" href={`/modify/${event.id}`}>
        <i class="fas fa-tools mr-2"></i>EDIT \ SETTINGS
        </a>
      </div>
      <div id="carouselEventIndicators" class="carousel slide" data-ride="carousel" data-interval="2000">
        <ol class="carousel-indicators">
          <li data-target="#carouselEventIndicators" data-slide-to="0" class="active"></li>
          <li data-target="#carouselEventIndicators" data-slide-to="1"></li>
          <li data-target="#carouselEventIndicators" data-slide-to="2"></li>
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
          <a class="carousel-control-prev" href="#carouselEventIndicators" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a class="carousel-control-next" href="#carouselEventIndicators" role="button" data-slide="next">
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