import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'

const Menu = ({fba, fbp}) => {
  return (
    <div className="btn-group-vertical w-100 mb-4">
        <div className='menu-header mb-3'>        
          <table class="table mb-0">
            <tbody>
              <tr>
                <td className='border-0 p-0 h4 font-weight-bold'>
                  <a href={`/profile/${fba.uid}`}>{fbp.profileName}</a>
                  <span className='ml-2'>/ Personal Settings</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <LinkContainer to='/settings/profile'>
          <button type="button" className="btn btn-lg btn-outline-dark rounded-0 border-dark font-weight-bold text-left px-2 my-1"><i class="fas fa-minus mr-2"></i>PROFILE</button>        
        </LinkContainer>
        <LinkContainer to='/settings/account'>
          <button type="button" className="btn btn-lg btn-outline-dark rounded-0 border-dark font-weight-bold text-left px-2 my-1"><i class="fas fa-minus mr-2"></i>ACCOUNT</button>
        </LinkContainer>
    </div>
  )
}

export default Menu
