import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'

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
                                    ?   <a href={`/profile/${fba.uid}`}>
                                            <img src={fbp.avatarUrl} className="hoster mr-3" alt="..."/>
                                        </a>
                                    :   <img 
                                            src='/static/images/anonymous-user.png' 
                                            className="hoster mr-3" alt="..."
                                        />
                                }
                            </th>
                            <td className='border-0 p-0'>
                                {
                                    authenticated
                                    ?   <a href={`/profile/${fba.uid}`}>{fbp.displayName}</a>                  
                                    :   <span>Anonymous</span>
                                }
                                <span className='ml-2'>/ Trending Events</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <LinkContainer to={`/trending/asia`}>
                <button 
                    type="button" 
                    className="btn btn-lg btn-outline-dark rounded-0 border-dark font-weight-bold text-left px-2 my-1"
                    >
                    <i class="fas fa-minus mr-2"></i>ASIA
                </button>        
            </LinkContainer>
            <LinkContainer to={`/trending/africa`}>
                <button 
                    type="button" 
                    className="btn btn-lg btn-outline-dark rounded-0 border-dark font-weight-bold text-left px-2 my-1"
                    >
                    <i class="fas fa-minus mr-2"></i>AFRICA
                </button>        
            </LinkContainer>
            <LinkContainer to={`/trending/europe`}>
                <button 
                    type="button" 
                    className="btn btn-lg btn-outline-dark rounded-0 border-dark font-weight-bold text-left px-2 my-1"
                    >
                    <i class="fas fa-minus mr-2"></i>EUROPE
                </button>        
            </LinkContainer>
            <LinkContainer to={`/trending/northamerica`}>
                <button 
                    type="button" 
                    className="btn btn-lg btn-outline-dark rounded-0 border-dark font-weight-bold text-left px-2 my-1"
                    >
                    <i class="fas fa-minus mr-2"></i>NORTH AMERICA
                </button>        
            </LinkContainer>
            <LinkContainer to={`/trending/southamerica`}>
                <button 
                    type="button" 
                    className="btn btn-lg btn-outline-dark rounded-0 border-dark font-weight-bold text-left px-2 my-1"
                    >
                    <i class="fas fa-minus mr-2"></i>SOUTH AMERICA
                </button>        
            </LinkContainer>
            <LinkContainer to={`/trending/oceania`}>
                <button 
                    type="button" 
                    className="btn btn-lg btn-outline-dark rounded-0 border-dark font-weight-bold text-left px-2 my-1"
                    >
                    <i class="fas fa-minus mr-2"></i>OCEANIA
                </button>        
            </LinkContainer>
            <LinkContainer to={`/trending/antarctica`}>
                <button 
                    type="button" 
                    className="btn btn-lg btn-outline-dark rounded-0 border-dark font-weight-bold text-left px-2 my-1"
                    >
                    <i class="fas fa-minus mr-2"></i>ANTARCTICA
                </button>        
            </LinkContainer>
        </div>
    )
}

export default Menu
