import React from 'react'
import { connect } from 'react-redux'
import Menu from './Menu.jsx'
import { Route, Switch, Redirect } from 'react-router-dom'
import EventForm from '../../forms/EventForm.jsx'
import Attendees from './Attendees.jsx'

const mapState = (state, ownProps) => {
    const eventId = ownProps.match.params.id
    let event = {}
    if (eventId && state.events.length > 0) {
      event = state.events.find(e => e.id === eventId)
    }
    return {event}
}  

const Dashboard = ({event}) => {
  return (
    <div className='row'>
        <div className='col-lg-4'>
            <Menu event={event}/>
        </div>    
        <div className='col-lg-8'>
            <Switch>
                <Redirect 
                    exact 
                    from={`/manage/events/${event.id}`} 
                    to={`/manage/events/${event.id}/info`}
                />
                <Route 
                    path={`/manage/events/${event.id}/info`} 
                    render={()=><EventForm event={event} isManage={true}/>}
                />
                <Route 
                    path={`/manage/events/${event.id}/attendees`} 
                    render={()=><Attendees attendees={event.attendees}/>}
                />
            </Switch>
        </div>
    </div>
  )
}

export default connect(mapState)(Dashboard)
