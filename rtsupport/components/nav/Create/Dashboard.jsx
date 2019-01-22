import React, { Component } from 'react'
import { connect } from 'react-redux'
import Menu from './Menu.jsx'
import { Route, Switch, Redirect } from 'react-router-dom'
import EventForm from '../../forms/EventForm.jsx'
import GroupForm from '../../forms/GroupForm.jsx'
import { createEvent } from '../../events/eventActions.jsx'
import { DateTime } from "luxon";
import cuid from 'cuid'

const mapState = () => {
    let event = {
        hostedBy: 'Anonymous',
        title: '',
        location: '',
        startDate: DateTime.local().plus({minutes:1}).toFormat('yyyy/MM/dd, HH:mm'),
        endDate: DateTime.local().plus({minutes:2}).toFormat('yyyy/MM/dd, HH:mm'),
        description: '',
        permission: 0  
    }
    return {
        event
    }
}  

const actions = {
    createEvent
}

class Dashboard extends Component {
    handleCreateEvent = (event) => {
        const nobodyPhotoURL = '/static/images/whazup-square-logo.png'
        const newEvent = {
            ...event,
            id: cuid(),
            hostPhotoURL: nobodyPhotoURL,
            attendees: [
                { id: 'b', name: event.hostedBy, photoURL: nobodyPhotoURL },
            ],
        }
        this.props.createEvent(newEvent)
        this.props.history.push('/userid')
    }
    render() {
        const {event} = this.props
        const options = [
            { label: event.hostedBy, value: event.hostedBy },
        ]
        return (
            <div className='row'>
                <div className='col-lg-4'>
                    <Menu/>
                </div>    
                <div className='col-lg-8'>
                    <Switch>
                        <Redirect exact from='/create' to='/create/event'/>
                        <Route 
                            path='/create/event' 
                            render={()=>
                                <EventForm 
                                    options={options}                                
                                    event={event} 
                                    handleCreateEvent={this.handleCreateEvent}
                                />
                            }
                        />
                        <Route path='/create/group' component={GroupForm}/>
                    </Switch>
                </div>
            </div>
        )        
    }
}

export default connect(mapState, actions)(Dashboard)
