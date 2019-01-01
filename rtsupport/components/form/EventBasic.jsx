import React, { Component } from 'react'
import Select from 'react-select'
import { DateTimePicker, MuiPickersUtilsProvider } from 'material-ui-pickers';
import LuxonUtils from '@date-io/luxon';
import { DateTime } from "luxon";

const options = [
  { value: 'user', label: 'USER' },
  { value: 'group_1', label: 'Group_1' },
  { value: 'group_2', label: 'Group_2' }  
];

class EventBasic extends Component {
  state = {
    selectedOption: null,
    selectedStartDate: DateTime.local(),
    selectedEndDate: DateTime.local(),
  }
  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  }
  handleStartDateChange = (date) => {
    this.setState({selectedStartDate: date});
  };
  handleEndDateChange = (date) => {
    this.setState({selectedEndDate: date});
  };
  render() {
    const { selectedOption } = this.state;
    return (
      <form>
        <div className="form-group">
          <h6 className='font-weight-bold'>Host</h6>
          <Select
            className='w-auto'
            value={selectedOption}
            onChange={this.handleChange}
            options={options}
            theme={(theme) => ({
              ...theme,
              borderRadius: 0,
              colors: {
              ...theme.colors,
                primary25: '#f5f5f5',
                primary: '#303aa5',
              },
            })}
          />
        </div> 
        <div className="form-group">
          <h6 className='font-weight-bold'>Event Name</h6>
          <input type="text" className="form-control rounded-0" placeholder="Add a short, clear name"/>
        </div>            
        <div class="form-group">
          <h6 className='font-weight-bold'>Location</h6>
          <input type="text" className="form-control rounded-0" placeholder="Include a place or address"/>
        </div>
        <div class="form-group">
          <h6 className='font-weight-bold'>Start Date, Time</h6>
          <MuiPickersUtilsProvider utils={LuxonUtils}>
            <div className="picker ml-2">
              <DateTimePicker
                className='w-100'
                value={this.state.selectedStartDate}
                onChange={this.handleStartDateChange}    
                showTodayButton    
              />
            </div>
          </MuiPickersUtilsProvider>
        </div>
        <div class="form-group">
          <h6 className='font-weight-bold'>End Date, Time</h6>
          <MuiPickersUtilsProvider utils={LuxonUtils}>
            <div className="picker ml-2">
              <DateTimePicker
                className='w-100'
                value={this.state.selectedEndDate}
                onChange={this.handleEndDateChange}    
                showTodayButton    
              />
            </div>
          </MuiPickersUtilsProvider>
        </div>
        <div class="form-group">
          <h6 className='font-weight-bold'>Description</h6>
          <textarea className="form-control rounded-0" rows='3' placeholder="Tell people more about the event"/>
        </div>
        <hr/>
        <div class="form-check mb-3">
          <input class="form-check-input" type="radio" name="permission" checked/>
          <label class="form-check-label font-weight-bold mr-2">Public</label>
          <small class="text-muted">Anyone can join this event.</small>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="permission"/>
          <label class="form-check-label font-weight-bold mr-2">Private</label>
          <small class="text-muted">You choose who can join this event.</small>
        </div>
        <hr/>
        <button type="submit" class="btn btn-dark btn-lg rounded-0 text-ddc213 font-weight-bold">Create Event</button>
      </form>
    )
  }
}

export default EventBasic