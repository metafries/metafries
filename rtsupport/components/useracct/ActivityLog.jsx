import React from 'react'

function ActivityLog() {
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
    </div>
  )
}

export default ActivityLog
