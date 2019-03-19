import React, { Component } from 'react'
import { connect } from 'react-redux'
import Menu from './Menu.jsx'
import { Route, Switch, Redirect } from 'react-router-dom'
import EventForm from '../../forms/EventForm.jsx'
import GroupForm from '../../forms/GroupForm.jsx'
import { createEvent } from '../../events/eventActions.jsx'
import Footer from '../../nav/Footer.jsx'
import { DateTime } from "luxon";

const mapState = (state) => {
    let event = {
        hostedBy: '',
        title: '',
        location: '',
        latlng: null,
        startDate: DateTime.local().plus({minutes:1}).toFormat('yyyy/MM/dd, HH:mm'),
        endDate: DateTime.local().plus({minutes:2}).toFormat('yyyy/MM/dd, HH:mm'),
        description: '',
        permission: 0  
    }
    return {
        fba: state.firebase.auth,            
        event
    }
}  

const actions = {
    createEvent
}

class Dashboard extends Component {
    handleCreateEvent = (event) => {
        this.props.createEvent(event)
        this.props.history.push('/userid')
    }
    render() {
        const {fba, event} = this.props
        const options = [
            { label: fba.displayName, value: fba.displayName },
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
                                    fba={fba}
                                    event={event} 
                                    handleCreateEvent={this.handleCreateEvent}
                                />
                            }
                        />
                        <Route path='/create/group' component={GroupForm}/>
                    </Switch>
                </div>
                <Footer/>
            </div>
        )        
    }
}

export default connect(mapState, actions)(Dashboard)
