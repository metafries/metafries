import React from 'react'

const EventDetailHeader = ({event}) => {
  return (
    <div className='card mb-3 rounded-0 border-white'>
      <div className='card-header rounded-0 p-0'
           style={{background:`url(/static/images/IMG_20180706_185041.jpg)`}}>
        <div className='transbox m-0 p-2'>
          <h1 className='card-title mb-1'>{event.title}</h1>
          <p className='mb-1'><i class="far fa-clock"></i> {event.startDate} - {event.endDate}</p>
          <p className='mb-1'><i class="fas fa-map-marker-alt"></i> {event.venue}</p>
          <p><i class="fas fa-home"></i> Hosted by <strong>{event.hostedBy}</strong></p>        
        </div>
      </div>
      <div className='card-body rounded-0 px-0 pt-1'>
        <button 
          type="button" 
          class="btn btn-dark rounded-0 text-ddc213 font-weight-bold w-100 mb-1 text-right">
          <i class="fas fa-fire"></i> Like | 4,957,524
        </button>
        <button 
          type="button" 
          class="btn btn-dark rounded-0 text-ddc213 font-weight-bold w-100 text-right">
          <i class="fas fa-check"></i> Going | 2
        </button>
      </div>
    </div>
  )
}

export default EventDetailHeader