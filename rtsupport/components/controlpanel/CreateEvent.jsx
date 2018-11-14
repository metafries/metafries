import React, { Component } from 'react'
import { DateTimePicker, MuiPickersUtilsProvider } from 'material-ui-pickers';
import LuxonUtils from '@date-io/luxon';

class CreateEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {selectedStartDate: new Date()};
    this.state = {selectedEndDate: new Date()};    
  }
  handleStartDateChange(date) {
    this.setState({selectedStartDate: date});
  };
  handleEndDateChange(date) {
    this.setState({selectedEndDate: date});
  };
  render() {
    return (
        <div class="card rounded-0 border-dark border-bottom-0">
          <div class="card-header border-dark px-0 py-0 bg-white" id="headingTwo">
            <button class="btn btn-outline-dark rounded-0 btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
              <i class="fas fa-plus"></i> <strong>New</strong>
            </button>
          </div>
          <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#dashboard">
            <div class="card-body px-0">
              <form>
                <div class="form-group mb-1">
                  <h6 class='mb-0 ml-2 font-weight-bold'>Title</h6>
                  <input type="text" class="form-control rounded-0 pl-2" id="event-title-input" aria-describedby="eventCreateTitle" placeholder="Enter Title"/>
                </div>
                <div class="form-group mb-1">
                  <h6 class='mb-0 ml-2 font-weight-bold' for='eventDescription'>Description</h6>
                  <textarea class="form-control rounded-0 pl-2" id="eventDescription" placeholder="Enter Description" rows="3"></textarea>
                </div>
                <div class="form-group mb-1">
                  <h6 class='mb-0 ml-2 font-weight-bold'>Location</h6>
                  <input type="text" class="form-control rounded-0 pl-2" id="event-title-input" aria-describedby="eventCreateTitle" placeholder="Enter Location"/>
                </div>
                <div class="form-group mb-1">
                  <h6 class='mb-0 ml-2 font-weight-bold'>Start Date</h6>
                  <MuiPickersUtilsProvider utils={LuxonUtils}>
                    <div className="picker ml-2">
                      <DateTimePicker
                        value={this.state.selectedStartDate}
                        onChange={this.handleStartDateChange.bind(this)}    
                        showTodayButton    
                      />
                    </div>
                  </MuiPickersUtilsProvider>                
                </div>
                <div class="form-group mb-3">
                  <h6 class='mb-0 ml-2 font-weight-bold'>End Date</h6>
                  <MuiPickersUtilsProvider utils={LuxonUtils}>
                    <div className="picker ml-2">
                      <DateTimePicker
                        value={this.state.selectedEndDate}
                        onChange={this.handleEndDateChange.bind(this)}    
                        showTodayButton    
                      />
                    </div>
                  </MuiPickersUtilsProvider>                
                </div>
                <button type="submit" class="btn btn-dark float-right mb-3 rounded-0 text-ddc213 font-weight-bold">Create</button>
              </form>
            </div>
          </div>
        </div>
    )
  }
}

export default CreateEvent