import React, { Component } from 'react'
import Photos from './Photos.jsx'

class About extends Component {
    render() {
        const {providerId, loading, setAvatar, deleteProfilePicture, photos, fba, fbp} = this.props
        const isCurrentUser = fba.uid === fbp.id
        const authenticated = fba.isLoaded && !fba.isEmpty            
        return (
            <div class="col-lg-3 px-0 mb-4">
                <Photos 
                    isCurrentUser={isCurrentUser}
                    setAvatar={setAvatar}
                    deleteProfilePicture={deleteProfilePicture}
                    photos={photos}
                    fba={fba}
                    fbp={fbp}
                    providerId={providerId} 
                    loading={loading}
                />
                <h2 className='transbox p-3 text-right'>
                    {fbp.displayName}
                    <h6 className='text-light mb-0'>-- subscribers</h6>
                    <hr className='edh-h my-2'/>
                    {
                        isCurrentUser &&
                        <a 
                            role='button' 
                            href='/settings/profile'
                            className='btn btn-outline-light btn-lg rounded-0 font-weight-bold py-0 w-100'
                            >
                            EDIT
                        </a>    
                    }
                    {
                        !authenticated &&
                        <span className='disabled'>
                            <button 
                                type="button" 
                                className='btn btn-dark follow-btn btn-lg rounded-0 font-weight-bold py-0 w-100'
                                >
                                SUBSCRIBE
                            </button>   
                        </span> 
                    }                     
                    {
                        authenticated && !isCurrentUser &&
                        <button 
                            type="button" 
                            className='btn btn-dark follow-btn btn-lg rounded-0 font-weight-bold py-0 w-100'
                            >
                            SUBSCRIBE
                        </button>    
                    } 
                </h2>
                <div className='card rounded-0'>
                    <div className='card-body px-3 py-0'>
                        {
                            fbp.bio && fbp.bio.length != 0 &&
                            <h5 className='mb-4'>{fbp.bio}</h5>
                        }
                        {
                            fbp.company && fbp.company.length != 0 &&
                            <h5 className='mb-4'>
                                <i class="fas fa-building icon"></i>
                                <span className='font-weight-bold'>Company</span>
                                <hr className='mt-0 mb-2'/>
                                <span>{fbp.company}</span>
                            </h5>
                        }
                        {
                            fbp.location && fbp.location.length != 0 &&
                            <h5 className='mb-4'>
                                <i class="fas fa-map-marker-alt icon"></i>
                                <span className='font-weight-bold'>Location</span>
                                <hr className='mt-0 mb-2'/>
                                <span>{fbp.location}</span>
                            </h5>
                        }
                        {
                            fbp.website && fbp.website.length != 0 &&
                            <h5 className='mb-4'>
                                <i class="fas fa-link icon"></i>
                                <span className='font-weight-bold'>URL</span>
                                <hr className='mt-0 mb-2'/>
                                <span><a href={fbp.website}>{fbp.website}</a></span>
                            </h5>
                        }
                    </div>
                </div>
                <div className='card rounded-0'>
                    <div className='card-header rounded-0 transbox px-3'>
                        <h5 className='mb-0'>1 Group</h5>
                    </div>
                    <div className='card-body px-3'>
                        <img className='signout' src='/static/images/whazup-square-logo.png'/>
                    </div>
                </div>
            </div>
        )
    }
}

export default About