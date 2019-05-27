import React, { Component } from 'react'
import distanceInWords from 'date-fns/distance_in_words'

class ActivityLogItem extends Component {
  render() {
    const {activity} = this.props
    return (
        <tr>
            <th scope="row" className='signout rounded-circle py-3 pl-3 border-0'>
                <a href={`/profile/${activity.hostUid}`}>
                    <img 
                        src={activity.hostAvatarUrl || '/static/images/whazup-square-logo.png'} 
                        className="signout rounded-circle" alt="..."
                    />
                </a>
            </th>
            <td className='border-0 pr-3 h6'>
                <a className='eds-a font-weight-bold mr-2' href={`/profile/${activity.hostUid}`}>
                    {activity.hostedBy}
                </a>
                {
                    activity.type === 'CREATE_EVENT' &&
                    <span className='text-secondary'>added an event.</span>
                }
                {
                    activity.type === 'UPDATE_STATUS' && activity.status === 1 &&
                    <span className='text-secondary'>canceled an event.</span>
                }  
                {
                    activity.type === 'UPDATE_STATUS' && activity.status === 0 &&
                    <span className='text-secondary'>reactivated an event.</span> 
                }    
                <br/>
                <a href={`/events/${activity.eventId}`}>{activity.title}</a>   
                <br/>
                <small className='text-secondary'>
                    {distanceInWords(activity.timestamp.toDate(), Date.now())} ago             
                </small>
            </td>
        </tr>
    )
  }
}

export default ActivityLogItem