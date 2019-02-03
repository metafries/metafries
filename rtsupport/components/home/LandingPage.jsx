import React, { Component } from 'react'
import { connect } from 'react-redux'
import SignInForm from '../forms/SignInForm.jsx'

const active = 'btn btn-outline-dark btn-lg rounded-0 w-50 font-weight-bold active'
const notActive = 'btn btn-outline-dark btn-lg rounded-0 w-50 font-weight-bold'
const mapState = (state) => ({
  auth: state.auth
})

class LandingPage extends Component {
  state = {
    defaultOpts: true,
  }
  hendledefaultOpts = () => {
    this.setState(prevState => ({
      defaultOpts: !prevState.defaultOpts
    }))
  }
  render() {
    return (
      <div className='row'>
        <div className='col-lg-4'></div>
        <div className='col-lg-4'>
          <img className="logo mb-2" src="/static/images/_logo.png"/>
          <h4 className='mb-4 ml-5 pl-5 font-italic font-weight-bold'>Let's Meet Up!</h4>
          <div className='card border-dark rounded-0 mb-3'>
            <div className='card-header border-dark bg-white font-weight-bold p-0'>
              <button 
                type="button" 
                class={ this.state.defaultOpts ? notActive : active }
                onClick={this.hendledefaultOpts}
              >
                Sign up
              </button>
              <button 
                type="button" 
                class={ this.state.defaultOpts ? active : notActive }
                onClick={this.hendledefaultOpts}                
              >
                Sign in
              </button>
            </div>
            <div className='card-body transbox'>
              { this.state.defaultOpts ? <SignInForm/> : 'TODO: Sign-Up Opts' }
            </div>
          </div>
          {
            this.props.auth.authenticated 
            && <h6 className='pl-4 font-italic'>Sup? {this.props.auth.identity}</h6>
          }          
          <a 
            role="button" 
            class="btn btn-dark btn-lg rounded-0 w-100 transbox text-left pl-4 font-weight-bold"
            href='/userid'
          >
            <i class="fas fa-fire icon text-center mr-4"></i>Trending           
          </a>
          <a 
            role="button" 
            class="btn btn-dark btn-lg rounded-0 w-100 transbox text-left pl-4 font-weight-bold"
            href='/userid'            
          >
            <i class="fas fa-map icon text-center mr-4"></i>Explore
          </a>  
          <hr/>
          <small className='font-weight-bold'>
            <i class="far fa-copyright mr-2"></i>2019 Metafries
          </small>
        </div>
        <div className='col-lg-4'></div>
      </div>
    )
  }
}

export default connect(mapState, null)(LandingPage)
