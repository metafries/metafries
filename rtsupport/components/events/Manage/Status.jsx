import React, { Component } from 'react'

class Status extends Component {
    state = {
        event: this.props.event,
    }
    handleStatusChange = (e) => {
        this.props.informMsg = null
        const update = this.state.event;
        update.status = e.target.value
        this.setState({
            event: update
        })
    }    
    onFormSubmit = (e) => {
        e.preventDefault()
        const {event} = this.state
        if (event.status == 2) {
            console.log('TODO: DELETE EVENT')
        } else {
            this.props.updateStatus(event.status, event.id)                        
        }
    }
    render() {
        const {event, loading, informMsg} = this.props        
        return (
            <form onSubmit={this.onFormSubmit}>
                <div class="form-check mb-3">
                    <input 
                        type="radio"
                        name="status"
                        value={0}   
                        checked={event.status == 0}       
                        onChange={this.handleStatusChange}
                        class="form-check-input"               
                    />
                    <div className='ml-2'>
                        <h5 class="form-check-label font-weight-bold">Active</h5>
                        <small class="text-muted">This event will be held as scheduled.</small>
                    </div>
                </div>   
                <div class="form-check mb-3">
                    <input 
                        type="radio"
                        name="status"
                        value={1}   
                        checked={event.status == 1}   
                        onChange={this.handleStatusChange}    
                        class="form-check-input"               
                    />
                    <div className='ml-2'>
                        <h5 class="form-check-label font-weight-bold">Cancel</h5>
                        <small class="text-muted">A canceled tag will be added but people will still be able to view this event.</small>
                    </div>
                </div>          
                <div class="form-check mb-3">
                    <input 
                        type="radio"
                        name="status"
                        value={2}   
                        onChange={this.handleStatusChange}    
                        class="form-check-input"               
                    />
                    <div className='ml-2'>
                        <h5 class="form-check-label font-weight-bold">Delete</h5>
                        <small class="text-muted">Everything related to this event will be deleted.</small>
                    </div>
                </div>           
                {
                    !loading && informMsg && informMsg.updateStatusOk &&
                    <h6 className='input-ok-msg mt-3 p-2'>
                        <i class="fas fa-check-circle mr-2 my-1"></i>
                        <span className='my-1'>{informMsg.updateStatusOk.message}</span>
                        <i class="fas fa-minus mx-2 my-1"></i>
                        <a href={`/events/${event.id}`} className='badge badge-pill badge-dark my-1 py-0'> 
                            view the event.
                        </a>
                    </h6>        
                }
                <hr/>
                {
                    loading
                    ?   <div className='h5'>
                            <span 
                                class="spinner-border mr-2" 
                                role="status" 
                                aria-hidden="true"
                                >
                            </span>
                            <span className='h3'>
                                Updating...
                            </span>
                        </div>  
                    :   <button 
                            type="submit" 
                            class="btn btn-dark btn-lg rounded-0 text-ddc213 font-weight-bold"
                            >
                            Confirm
                        </button>
                }
            </form>
        )
    }
}

export default Status
