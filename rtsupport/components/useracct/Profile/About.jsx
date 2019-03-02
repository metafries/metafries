import React, { Component } from 'react'

class About extends Component {
    render() {
        const {fba} = this.props
        return (
            <div class="col-lg-4 mb-4">
                <a href={fba.photoURL}>
                    <img src={fba.photoURL} style={{maxWidth:'100%'}}/>
                </a>
                <h2 className='transbox p-3 text-right'>
                    {fba.displayName}
                    <h6 className='text-light mb-0'>- subscribers</h6>
                </h2>
                <h5><i class="fas fa-building mr-2 icon"></i>-</h5>
                <h5><i class="fas fa-map-marker-alt mr-2 icon"></i>-</h5>
                <h5><i class="fas fa-link mr-2 icon"></i>-</h5>
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