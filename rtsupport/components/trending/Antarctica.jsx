import React, { Component } from 'react'
import EventSearch from'../search/EventSearch.jsx'

class Antarctica extends Component {
  render() {
    const { type, statusOpts } = this.props    
    return (
      <EventSearch
        isGeo={true}
        type={type}
        statusOpts={statusOpts}
      />
    )
  }
}

export default Antarctica