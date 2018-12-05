import React from 'react'

function LandingPage() {
  return (
    <div className='row'>
      <div className='col-lg-4'></div>
      <div className='col-lg-4'>
        <img className="logo mb-4" src="/static/images/_logo.png"/>
        <div className='card border-dark rounded-0 mb-3'>
          <div className='card-header border-dark bg-white font-weight-bold'>
            <h4 className='font-italic'> MetaFries, Met A Friend!</h4>
            <i class="far fa-clock"></i> Anytime
            <i class="fas fa-map-marker-alt ml-2"></i> Anywhere
            <i class="fas fa-bolt ml-2"></i> 4,957,524<br/>
            <small>Hosted by <a href='#'>METAFRIES</a></small>
          </div>
          <div className='card-body'>
            TODO: Sign-In Opts
          </div>
          <div><a href='/userid' role="button" class="btn btn-dark float-right mb-3 rounded-0 text-ddc213 font-weight-bold">
              Later <i class="fas fa-chevron-circle-right"></i>
          </a></div>
          <div class="card-footer px-0 py-0 bg-white">
            <button type="button" class="btn btn-outline-dark rounded-0 w-50 border-dark border-left-0"><i class="fas fa-fire"></i> Trending</button>
            <button type="button" class="btn btn-outline-dark rounded-0 w-50 border-dark border-left-0 border-right-0"><i class="fas fa-map"></i> Explore</button>
          </div>
        </div>
        <small><i class="far fa-copyright"></i> 2018 METAFRIES</small>        
      </div>
      <div className='col-lg-4'></div>
    </div>
  )
}

export default LandingPage
