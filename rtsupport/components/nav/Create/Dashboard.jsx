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
        permission: 0,
        status: 0,
    }
    return {
        fbp: state.firebase.profile,        
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
        this.props.history.push(`/search/${this.props.fba.uid}/subscriptions`)
    }
    render() {
        const {fbp, fba, event} = this.props
        const options = [
            { label: fba.displayName, value: fba.displayName },
        ]
        return (
            <div>
                <div className='row'>
                    <div className='col-lg-2'></div>
                    <div className='col-lg-3 px-3'>
                        <Menu fba={fba} fbp={fbp}/>
                    </div>    
                    <div className='col-lg-5 px-3'>
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
                    <div className='col-lg-2'></div>
                </div>
                <Footer/>
            </div>
        )        
    }
}

export default connect(mapState, actions)(Dashboard)
