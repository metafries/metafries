import React from 'react'
import Footer from '../nav/Footer.jsx'

const Trending = () => {
  return (
    <div>
        <div className='row'>
            <div className='col-lg-2'></div>
            <div className='col-lg-8'>
                <div class="input-group mb-2">
                    <input 
                        type="text" 
                        class="form-control form-control-lg rounded-0 border-left-0 border-top-0 border-right-0 mr-2 font-weight-bold search-bar"
                        placeholder='Sup? Search Metafries'
                    />
                    <div class="input-group-append">
                        <button class="btn btn-link rounded-0 py-0 pl-2 pr-1 text-000 search-icon" type="button">
                            <i class="fas fa-search h4"></i>
                        </button>
                    </div>
                </div>            
            </div>
            <div className='col-lg-2'></div>
        </div>
        <Footer/>
    </div>
  )
}

export default Trending
