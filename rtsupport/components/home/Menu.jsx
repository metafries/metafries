import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'

const Menu = ({
  totalRecommended,
  totalSubscriptions,
  totalActivities,
  fba, 
  fbp
}) => {
  const authenticated = fba.isLoaded && !fba.isEmpty
  return (
    <div className="btn-group-vertical w-100">
      <div className='menu-header mb-3'>
        <table class="table mb-0">
          <tbody>
            <tr>
              <td className='border-0 p-0 h4 font-weight-bold'>
              {
                authenticated
                ? <div>
                    <a href={`/profile/${fba.uid}`}>{fbp.profileName}</a>
                    <span className='ml-2'>/ Custom Search</span>
                  </div>
                : <h5 className='mb-0'>
                    <i class="fas fa-exclamation-triangle mr-2"></i>
                    You are currently in anonymous mode，
                    <a href='/'>Log In</a> to have a fully functional operations.
                  </h5>        
              }
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <LinkContainer to={`/search/${fba.uid}/recommended`}>
        <button 
          type="button" 
          className="btn btn-lg btn-outline-dark rounded-0 border-dark font-weight-bold text-left px-2 my-1"
          >
          <i class="fas fa-minus mr-2"></i>
          RECOMMENDED
          <span className='ml-2'>{`(${totalRecommended})`}</span>
        </button>
      </LinkContainer>
      {
        authenticated &&
        <LinkContainer to={`/search/${fba.uid}/subscriptions`}>
          <button 
            type="button" 
            className="btn btn-lg btn-outline-dark rounded-0 border-dark font-weight-bold text-left px-2 my-1"
            >
            <i class="fas fa-minus mr-2"></i>
            SUBSCRIPTIONS
            <span className='ml-2'>{`(${totalSubscriptions})`}</span>
          </button>
        </LinkContainer>
      }
      {
        authenticated &&
        <LinkContainer to={`/search/${fba.uid}/activity`}>
          <button 
            type="button" 
            className="btn btn-lg btn-outline-dark rounded-0 border-dark font-weight-bold text-left px-2 my-1"
            >
            <i class="fas fa-minus mr-2"></i>
            ACTIVITY LOG
            <span className='ml-2'>{`(${totalActivities})`}</span>
          </button>
        </LinkContainer>
      }
    </div>
  )
}

export default Menu
