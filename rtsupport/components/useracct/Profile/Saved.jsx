import React, { Component } from 'react'
import EventSearch from'../../search/EventSearch.jsx'

class Saved extends Component {
  render() {
    const { profileId, type, statusOpts } = this.props    
    return (
      <EventSearch
        profileId={profileId}
        type={type}
        statusOpts={statusOpts}
      />
    )
  }
}

export default Saved