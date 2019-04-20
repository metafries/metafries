import React, { Component } from 'react'

class Status extends Component {
    state = {
        event: this.props.event,
    }
    handleStatusChange = (e) => {
        const update = this.state.event;
        update.status = e.target.value
        this.setState({
            event: update
        })
    }    
    render() {
        const {event} = this.props        
        return (
            <form>
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
                        <small class="text-muted">A canceled tag will be added and people will still be able to view this event.</small>
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
                <hr/>
                <button 
                    type="submit" 
                    class="btn btn-dark btn-lg rounded-0 text-ddc213 font-weight-bold"
                    >
                    Confirm
                </button>
            </form>
        )
    }
}

export default Status
