import React, { Component } from 'react'
import { DateTimePicker, MuiPickersUtilsProvider } from 'material-ui-pickers';
import LuxonUtils from '@date-io/luxon';
import { DateTime } from "luxon";

class EditEvent extends Component {
  state = {
    selectedEvent: this.props.selectedEvent
  }
  handleStartDateChange = (date) => {
    const update = this.state.selectedEvent;
    update.startDate = date.toFormat('ff')
    this.setState({
        selectedEvent: update
    });
  };
  handleEndDateChange = (date) => {
    const update = this.props.selectedEvent;
    update.endDate = date.toFormat('ff')
    this.setState({
        selectedEvent: update
    });
  };
  onInputChange = (e) => {
    const userInput = this.state.selectedEvent;
    userInput[e.target.name] = e.target.value;
    this.setState({
      selectedEvent: userInput
    })
  }
  onFormSubmit = (e) => {
    e.preventDefault();
    // TODO: Update The Activity Data
  }
  render() {
    const {selectedEvent} = this.state;
    return (
        <div class="modal fade" id={selectedEvent.id} tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content rounded-0">
                    <div class="modal-header">
                        <h5 class="modal-title"><i class="fas fa-edit"></i> Edit</h5>
                        <button type="button" class="close" data-dismiss="modal">
                            <span>&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form onSubmit={this.onFormSubmit}>
                            <div class="form-group mb-1">
                                <h6 class='mb-0 font-weight-bold'>Title</h6>
                                <input 
                                name='title'                                                  
                                onChange={this.onInputChange}                                 
                                value={selectedEvent.title}
                                type="text" 
                                class="form-control rounded-0 pl-2" 
                                id="event-title-input" 
                                placeholder="Enter Title"/>
                            </div>  
                            <div class="form-group mb-1">
                                <h6 class='mb-0 font-weight-bold' for='eventDescription'>Description</h6>
                                <textarea 
                                name='description'
                                onChange={this.onInputChange} 
                                value={selectedEvent.description}                                                                    
                                class="form-control rounded-0 pl-2" 
                                id="eventDescription" 
                                placeholder="Enter Description" 
                                rows="3">
                                </textarea>
                            </div>    
                            <div class="form-group mb-1">
                                <h6 class='mb-0 font-weight-bold'>Location</h6>
                                <input 
                                name='location'
                                onChange={this.onInputChange} 
                                value={selectedEvent.location}                                                                                      
                                type="text" 
                                class="form-control rounded-0 pl-2" 
                                id="event-title-input" 
                                aria-describedby="eventCreateTitle" 
                                placeholder="Enter Location"/>
                            </div>
                            <div class="form-group mb-1">
                                <h6 class='mb-0 font-weight-bold'>Start Date</h6>
                                <MuiPickersUtilsProvider utils={LuxonUtils}>
                                    <div className="picker ml-2">
                                    <DateTimePicker
                                        value={selectedEvent.startDate}
                                        onChange={this.handleStartDateChange}    
                                        showTodayButton    
                                    />
                                    </div>
                                </MuiPickersUtilsProvider>                
                            </div>
                            <div class="form-group mb-5">
                                <h6 class='mb-0 font-weight-bold'>End Date</h6>
                                <MuiPickersUtilsProvider utils={LuxonUtils}>
                                    <div className="picker ml-2">
                                    <DateTimePicker
                                        value={selectedEvent.endDate}
                                        onChange={this.handleEndDateChange}    
                                        showTodayButton    
                                    />
                                    </div>
                                </MuiPickersUtilsProvider>                
                            </div>
                        </form>
                        <button type="button" class="btn btn-link text-danger pl-0 font-weight-bold" data-dismiss="modal"><i class="fas fa-ban"></i> Cancel Activity</button>
                    </div>
                    <div class="modal-footer pt-0">
                        <button type="button" class="btn btn-secondary rounded-0 font-weight-bold" data-dismiss="modal">Close</button>                        
                        <button type="button" class="btn btn-dark rounded-0 font-weight-bold text-ddc213">Update</button>
                    </div>
                </div>
            </div>
        </div>
    )
  }
}

export default EditEvent