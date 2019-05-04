import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import Hosting from './Hosting.jsx'
import Going from './Going.jsx'
import Attended from './Attended.jsx'
import Liked from './Liked.jsx'
import Saved from './Saved.jsx'

class Overview extends Component {
  render() {
    const {fba, fbp} = this.props  
    const isCurrentUser = fba.uid === fbp.id  
    return (
      <div class="col-lg-5 px-0">
        <div className="btn-group-vertical w-100 mb-4 px-3">
          <LinkContainer to={`/profile/${fbp.id}/hosting`}>
            <button 
              type="button" 
              className="btn btn-lg btn-outline-dark rounded-0 border-dark font-weight-bold text-left px-2 my-1"
              >
              <i class="fas fa-minus mr-2"></i>HOSTING
              <span className='ml-2'>(0)</span>
            </button>        
          </LinkContainer>
          <LinkContainer to={`/profile/${fbp.id}/going`}>
            <button 
              type="button" 
              className="btn btn-lg btn-outline-dark rounded-0 border-dark font-weight-bold text-left px-2 my-1"
              >
              <i class="fas fa-minus mr-2"></i>GOING
              <span className='ml-2'>(0)</span>
            </button>      
          </LinkContainer>  
          <LinkContainer to={`/profile/${fbp.id}/attended`}>
            <button 
              type="button" 
              className="btn btn-lg btn-outline-dark rounded-0 border-dark font-weight-bold text-left px-2 my-1"
              >
              <i class="fas fa-minus mr-2"></i>ATTENDED
              <span className='ml-2'>(0)</span>
            </button>  
          </LinkContainer> 
          <LinkContainer to={`/profile/${fbp.id}/liked`}>     
            <button 
              type="button" 
              className="btn btn-lg btn-outline-dark rounded-0 border-dark font-weight-bold text-left px-2 my-1"
              >
              <i class="fas fa-minus mr-2"></i>LIKED
              <span className='ml-2'>(0)</span>
            </button>  
          </LinkContainer>  
          {
            isCurrentUser &&
            <LinkContainer to={`/profile/${fbp.id}/saved`}>
              <button 
                type="button" 
                className="btn btn-lg btn-outline-dark rounded-0 border-dark font-weight-bold text-left px-2 my-1"
                >
                <i class="fas fa-minus mr-2"></i>SAVED
                <span className='ml-2'>(0)</span>
              </button>      
            </LinkContainer>                            
          }
        </div>
        <Switch>
          <Redirect 
            exact from={`/profile/${fbp.id}`} to={`/profile/${fbp.id}/hosting`}
          />          
          <Route
            path={`/profile/${fbp.id}/hosting`}
            render={() => <Hosting fba={fba} fbp={fbp}/>}
          />          
          <Route
            path={`/profile/${fbp.id}/going`}
            render={() => <Going fba={fba} fbp={fbp}/>}
          />                    
          <Route
            path={`/profile/${fbp.id}/attended`}
            render={() => <Attended fba={fba} fbp={fbp}/>}
          />                              
          <Route
            path={`/profile/${fbp.id}/liked`}
            render={() => <Liked fba={fba} fbp={fbp}/>}
          />                                        
          <Route
            path={`/profile/${fbp.id}/saved`}
            render={() => <Saved fba={fba} fbp={fbp}/>}
          />                                                  
        </Switch>
      </div>
    )
  }
}

export default Overview