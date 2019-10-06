import React, { Component } from 'react'
import EventSearch from'../../search/EventSearch.jsx'

class Going extends Component {
  render() {
    const { profileId, type } = this.props    
    return (
      <EventSearch
        profileId={profileId}
        type={type}
        statusOpts={[{label:'ALL',value:'All'}]}
      />
    )
  }
}

export default Going