import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import TotalCountsLoader from '../layout/TotalCountsLoader.jsx'

const Menu = ({
    loading,
    totalAsiaEvents, 
    totalAfricaEvents,
    totalEuropeEvents,
    totalNorthAmericaEvents,
    totalSouthAmericaEvents,
    totalOceaniaEvents,
    totalAntarcticaEvents,
    fba, 
    fbp,
}) => {
    const authenticated = fba.isLoaded && !fba.isEmpty    
    return (
        <div className="btn-group-vertical w-100 mb-4">
            <div className='menu-header mb-3'>
                <table class="table mb-0">
                    <tbody>
                        <tr>
                            <td className='border-0 p-0 h4 font-weight-bold'>
                            {
                                authenticated
                                ?   <div>
                                        <a href={`/profile/${fba.uid}`}>{fbp.profileName}</a>
                                        <span className='ml-2'>/ Trending Events</span>
                                    </div>
                                :   <h5 className='mb-0'>
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
            <LinkContainer to={`/trending/asia`}>
                <button 
                    type="button" 
                    className="btn btn-lg btn-outline-dark rounded-0 border-dark font-weight-bold text-left px-2 my-1"
                    >
                    <i class="fas fa-minus mr-2"></i>ASIA
                    {loading ? <TotalCountsLoader/> : <span className='ml-2'>{`(${totalAsiaEvents})`}</span>}
                </button>        
            </LinkContainer>
            <LinkContainer to={`/trending/africa`}>
                <button 
                    type="button" 
                    className="btn btn-lg btn-outline-dark rounded-0 border-dark font-weight-bold text-left px-2 my-1"
                    >
                    <i class="fas fa-minus mr-2"></i>AFRICA
                    {loading ? <TotalCountsLoader/> : <span className='ml-2'>{`(${totalAfricaEvents})`}</span>}
                </button>        
            </LinkContainer>
            <LinkContainer to={`/trending/europe`}>
                <button 
                    type="button" 
                    className="btn btn-lg btn-outline-dark rounded-0 border-dark font-weight-bold text-left px-2 my-1"
                    >
                    <i class="fas fa-minus mr-2"></i>EUROPE
                    {loading ? <TotalCountsLoader/> : <span className='ml-2'>{`(${totalEuropeEvents})`}</span>}
                </button>        
            </LinkContainer>
            <LinkContainer to={`/trending/northamerica`}>
                <button 
                    type="button" 
                    className="btn btn-lg btn-outline-dark rounded-0 border-dark font-weight-bold text-left px-2 my-1"
                    >
                    <i class="fas fa-minus mr-2"></i>NORTH AMERICA
                    {loading ? <TotalCountsLoader/> : <span className='ml-2'>{`(${totalNorthAmericaEvents})`}</span>}
                </button>        
            </LinkContainer>
            <LinkContainer to={`/trending/southamerica`}>
                <button 
                    type="button" 
                    className="btn btn-lg btn-outline-dark rounded-0 border-dark font-weight-bold text-left px-2 my-1"
                    >
                    <i class="fas fa-minus mr-2"></i>SOUTH AMERICA
                    {loading ? <TotalCountsLoader/> : <span className='ml-2'>{`(${totalSouthAmericaEvents})`}</span>}
                </button>        
            </LinkContainer>
            <LinkContainer to={`/trending/oceania`}>
                <button 
                    type="button" 
                    className="btn btn-lg btn-outline-dark rounded-0 border-dark font-weight-bold text-left px-2 my-1"
                    >
                    <i class="fas fa-minus mr-2"></i>OCEANIA
                    {loading ? <TotalCountsLoader/> : <span className='ml-2'>{`(${totalOceaniaEvents})`}</span>}
                </button>        
            </LinkContainer>
            <LinkContainer to={`/trending/antarctica`}>
                <button 
                    type="button" 
                    className="btn btn-lg btn-outline-dark rounded-0 border-dark font-weight-bold text-left px-2 my-1"
                    >
                    <i class="fas fa-minus mr-2"></i>ANTARCTICA
                    {loading ? <TotalCountsLoader/> : <span className='ml-2'>{`(${totalAntarcticaEvents})`}</span>}
                </button>        
            </LinkContainer>
        </div>
    )
}

export default Menu
