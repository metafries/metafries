import React from 'react'
import ActivityLogItem from './ActivityLogItem.jsx'
import { SearchBar } from '../search/SearchBar.jsx'

function ActivityLog({activity}) {
  return (
    <div>
      <SearchBar placeholder='Search Activities ...'/>
      <h6 className='info-text-box mb-3 mx-3 p-2'>
        <i class="fas fa-info-circle mr-2"></i>
        The searching results are now limited to the activity of yourself and the users you subscribed.
      </h6>      
      <h6 className='mx-3 font-weight-bold mb-0'>
        Total of
        <span className='mx-1'>
          {activity && activity.length}
        </span>
        {activity && activity.length > 1 ? 'Activities' : 'Activity'}
      </h6>
      <table class="table mb-0">
        <tbody>
          {
            activity && activity.map((a) => (
              <ActivityLogItem key={a.id} activity={a}/>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default ActivityLog
