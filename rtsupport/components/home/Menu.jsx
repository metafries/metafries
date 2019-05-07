import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'

const Menu = ({fba, fbp}) => {
  const authenticated = fba.isLoaded && !fba.isEmpty
  return (
    <div className="btn-group-vertical w-100">
      <div className='menu-header mb-3'>
        <table class="table mb-0">
          <tbody>
            <tr>
              <th scope="row" className='border-0 float-right p-0'>
                {
                  authenticated
                  ? <a href={`/profile/${fba.uid}`}>
                      <img src={fbp.avatarUrl} className="hoster mr-3" alt="..."/>
                    </a>
                  : <img 
                      src='/static/images/whazup-square-logo.png' 
                      className="hoster mr-3" alt="..."
                      />
                }
              </th>
              <td className='border-0 p-0'>
                {
                  authenticated
                  ? <a href={`/profile/${fba.uid}`}>{fbp.displayName}</a>                  
                  : <span>Anonymous</span>
                }
                <span className='ml-2'>/ Personal Search</span>
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
          </button>
        </LinkContainer>
      }
    </div>
  )
}

export default Menu
