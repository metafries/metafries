import React, { Component } from 'react'
import distanceInWords from 'date-fns/distance_in_words'

class ActivityLogItem extends Component {
  render() {
    const {activity} = this.props
    return (
        <tr>
            <th scope="row" className='signout rounded-circle py-3 border-0'>
                <a href={`/profile/${activity.hostUid}`}>
                    <img 
                        src={activity.hostAvatarUrl || '/static/images/whazup-square-logo.png'} 
                        className="signout rounded-circle" alt="..."
                    />
                </a>
            </th>
            <td className='border-0'>
                <strong>
                    <a className='eds-a' href={`/profile/${activity.hostUid}`}>
                      {activity.hostedBy}
                    </a>
                </strong>
                <h6 className='ml-1 text-secondary d-inline'>
                    {
                        activity.type === 'CREATE_EVENT' &&
                        <span className='ml-1'>added an event.</span>
                    }
                    {
                        activity.type === 'UPDATE_STATUS' && activity.status === 1 &&
                        <span className='ml-1'>canceled an event.</span>
                    }  
                    {
                        activity.type === 'UPDATE_STATUS' && activity.status === 0 &&
                        <span className='ml-1'>reactivated an event.</span> 
                    }             
                </h6>
                <br/>
                <i class="fas fa-link mr-1"></i>
                <a href={`/events/${activity.eventId}`}>{activity.title}</a>                
                <small className='text-secondary d-block'>
                    {distanceInWords(activity.timestamp.toDate(), Date.now())} ago
                </small>    
            </td>
        </tr>
    )
  }
}

export default ActivityLogItem