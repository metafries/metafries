import React, { Component } from 'react'
import EventSearch from'../../search/EventSearch.jsx'

class Going extends Component {
  render() {
    const { profileId, type, statusOpts } = this.props    
    return (
      <EventSearch
        profileId={profileId}
        type={type}
        statusOpts={[statusOpts[0],statusOpts[1],statusOpts[2]]}
      />
    )
  }
}

export default Going