import React, { Component } from 'react'
import Photos from './Photos.jsx'

class About extends Component {
    state = {
        avatarUrl: this.props.fbp.avatarUrl
    }
    componentDidMount() {
        const {fbp, providerId} = this.props 
        if (providerId && providerId == 'facebook.com') {
            if (!fbp.avatarUrl.includes('firebasestorage')) {
                this.setState({
                    avatarUrl: fbp.avatarUrl+'?height=250'
                })  
            }
        }
    }        
    render() {
        const {loading, setAvatar, deleteProfilePicture, photos, fba, fbp} = this.props
        return (
            <div class="col-lg-3 px-0 mb-4">
                <Photos 
                    setAvatar={setAvatar}
                    deleteProfilePicture={deleteProfilePicture}
                    photos={photos}
                    fba={fba}
                    fbp={fbp}
                    avatarUrl={this.state.avatarUrl} 
                    loading={loading}
                />
                <h2 className='transbox p-3 text-right'>
                    {fbp.displayName}
                    <h6 className='text-light mb-0'>-- subscribers</h6>
                </h2>
                <div className='card rounded-0'>
                    <div className='card-body px-3 py-0'>
                        {
                            fbp.bio && fbp.bio.length != 0 &&
                            <h5>{fbp.bio}</h5>
                        }
                        {
                            fbp.company && fbp.company.length != 0 &&
                            <h5><i class="fas fa-building mr-2 icon"></i>{fbp.company}</h5>
                        }
                        {
                            fbp.location && fbp.location.length != 0 &&
                            <h5><i class="fas fa-map-marker-alt mr-2 icon"></i>{fbp.location}</h5>
                        }
                        {
                            fbp.website && fbp.website.length != 0 &&
                            <h5>
                                <i class="fas fa-link mr-2 icon"></i>
                                <a href={fbp.website}>{fbp.website}</a>
                            </h5>
                        }
                    </div>
                    <div className='card-footer rounded-0 bg-white px-3'>
                        <a 
                            role='button' 
                            href='/settings/profile'
                            className='btn btn-outline-dark btn-lg py-0 rounded-0 font-weight-bold w-100 border-2'
                            >
                            EDIT
                        </a>     
                    </div>
                </div>
            </div>
        )
    }
}

export default About