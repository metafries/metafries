import React, { Component } from 'react'
import Poster from './Poster.jsx'
import EventForm from '../../forms/EventForm.jsx'
import { ACTIVE, NOT_ACTIVE } from '../../nav/navConstants.jsx'

class Info extends Component {
    state = {
        defaultOpts: true,        
    }
    hendledefaultOpts = () => {
        this.setState(prevState => ({
            defaultOpts: !prevState.defaultOpts
        }))
    }        
    render() {
        const {loading, updateEvent, informMsg, options, event} = this.props
        const {defaultOpts} = this.state
        return (
            <div>
                <button 
                    type="button" 
                    class={defaultOpts ? ACTIVE : NOT_ACTIVE}
                    onClick={this.hendledefaultOpts}>
                    INTRO
                </button>
                <button 
                    type="button" 
                    class={defaultOpts ? NOT_ACTIVE : ACTIVE}
                    onClick={this.hendledefaultOpts}>
                    POSTER
                </button>
                <hr/>
                {
                    defaultOpts
                    ?   <EventForm
                            loading={loading}
                            updateEvent={updateEvent}
                            informMsg={informMsg}
                            options={options}
                            event={event} 
                            isManage={true}        
                        />
                    :   <Poster/>
                }
            </div>
        )
    }
}

export default Info