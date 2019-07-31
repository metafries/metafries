import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import Hosting from './Hosting.jsx'
import Going from './Going.jsx'
import Attended from './Attended.jsx'
import Liked from './Liked.jsx'
import Saved from './Saved.jsx'
import TotalCountsLoader from '../../layout/TotalCountsLoader.jsx'

class Overview extends Component {
  render() {
    const {loading, profileId, totalSaved, totalAttended, totalGoing, totalHosting, fba, fbp} = this.props 
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
              {loading ? <TotalCountsLoader/> : <span className='ml-2'>{`(${totalHosting})`}</span>}
            </button>        
          </LinkContainer>
          <LinkContainer to={`/profile/${fbp.id}/going`}>
            <button 
              type="button" 
              className="btn btn-lg btn-outline-dark rounded-0 border-dark font-weight-bold text-left px-2 my-1"
              >
              <i class="fas fa-minus mr-2"></i>GOING
              {loading ? <TotalCountsLoader/> : <span className='ml-2'>{`(${totalGoing})`}</span>}
            </button>      
          </LinkContainer>  
          <LinkContainer to={`/profile/${fbp.id}/attended`}>
            <button 
              type="button" 
              className="btn btn-lg btn-outline-dark rounded-0 border-dark font-weight-bold text-left px-2 my-1"
              >
              <i class="fas fa-minus mr-2"></i>ATTENDED
              {loading ? <TotalCountsLoader/> : <span className='ml-2'>{`(${totalAttended})`}</span>}
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
                {loading ? <TotalCountsLoader/> : <span className='ml-2'>{`(${totalSaved})`}</span>}
              </button>      
            </LinkContainer>                            
          }
        </div>
        <Switch>
          <Redirect 
            exact from={`/profile/${fbp.id}`} to={`/profile/${fbp.id}/going`}
          />          
          <Route
            path={`/profile/${fbp.id}/hosting`}
            render={() => <Hosting type='Hosting' profileId={profileId} fba={fba} fbp={fbp}/>}
          />          
          <Route
            path={`/profile/${fbp.id}/going`}
            render={() => <Going type='Going' profileId={profileId} fba={fba} fbp={fbp}/>}
          />                    
          <Route
            path={`/profile/${fbp.id}/attended`}
            render={() => <Attended type='Attended' profileId={profileId} fba={fba} fbp={fbp}/>}
          />                              
          <Route
            path={`/profile/${fbp.id}/liked`}
            render={() => <Liked type='Liked' fba={fba} fbp={fbp}/>}
          />                                        
          <Route
            path={`/profile/${fbp.id}/saved`}
            render={() => <Saved type='Saved' profileId={profileId} fba={fba} fbp={fbp}/>}
          />                                                  
        </Switch>
      </div>
    )
  }
}

export default Overview