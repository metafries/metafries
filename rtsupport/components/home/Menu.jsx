import React from 'react'

const Menu = ({fba, fbp}) => {
  const authenticated = fba.isLoaded && !fba.isEmpty
  return (
    <div className="btn-group-vertical w-100 mb-4">
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
                <span className='ml-2'>/ Limited Search</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <button 
        type="button" 
        className="btn btn-lg btn-outline-dark rounded-0 border-dark font-weight-bold text-left px-2 my-1"
        >
        <i class="fas fa-minus mr-2"></i>
        RECOMMENDED
      </button>
      {
        authenticated &&
        <button 
          type="button" 
          className="btn btn-lg btn-outline-dark rounded-0 border-dark font-weight-bold text-left px-2 my-1"
          >
          <i class="fas fa-minus mr-2"></i>
          SUBSCRIPTIONS
        </button>
      }
      {
        authenticated &&
        <button 
          type="button" 
          className="btn btn-lg btn-outline-dark rounded-0 border-dark font-weight-bold text-left px-2 my-1"
          >
          <i class="fas fa-minus mr-2"></i>
          ACTIVITY
        </button>
      }
    </div>
  )
}

export default Menu