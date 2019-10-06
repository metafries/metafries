import React, { Component } from 'react'
import EventSearch from'../search/EventSearch.jsx'

class Recommended extends Component {
  render() {
    return (
      <EventSearch
        type={this.props.type}
        statusOpts={[{label:'ALL',value:'All'}]}
      />
    )
  }
}

export default Recommended