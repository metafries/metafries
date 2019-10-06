import React, { Component } from 'react'
import EventSearch from'../search/EventSearch.jsx'

class Subscriptions extends Component {
  render() {
    const { type, statusOpts } = this.props
    return (
      <EventSearch
        type={type}
        statusOpts={statusOpts}
      />
    )
  }
}

export default Subscriptions