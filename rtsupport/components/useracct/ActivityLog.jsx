import React from 'react'
import ActivityLogItem from './ActivityLogItem.jsx'

function ActivityLog({activity}) {
  return (
    <div>
      <div class="input-group mb-2 px-3">
        <input 
          type="text" 
          class="form-control form-control-lg rounded-0 border-left-0 border-top-0 border-right-0 mr-2 font-weight-bold search-bar"
          placeholder='Activity Search'
        />
        <div class="input-group-append">
          <button class="btn btn-link rounded-0 py-0 pl-2 pr-1 text-000 search-icon" type="button">
            <i class="fas fa-search h4"></i>
          </button>
        </div>
      </div>
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
