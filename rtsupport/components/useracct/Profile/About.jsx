import React, { Component } from 'react'

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
        const {fbp} = this.props
        return (
            <div class="col-lg-4 mb-4">
                <a href={fbp.avatarUrl}>
                    <img src={this.state.avatarUrl} style={{width:'100%'}}/>
                </a>
                <h2 className='transbox p-3 text-right'>
                    {fbp.displayName}
                    <h6 className='text-light mb-0'>-- subscribers</h6>
                </h2>
                {
                    fbp.bio && fbp.bio.length != 0 &&
                    <h5 className='my-4'>{fbp.bio}</h5>
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
                <a 
                    role='button' 
                    href='/settings/profile'
                    className='btn btn-outline-dark rounded-0 mt-2 font-weight-bold w-100 border-2'
                    >
                    EDIT
                </a>
                <hr/>
                <h3 className='mb-0 font-weight-bold'>Groups</h3>
                <hr/>
                <img className='signout' src='/static/images/whazup-square-logo.png'/>
            </div>
        )
    }
}

export default About