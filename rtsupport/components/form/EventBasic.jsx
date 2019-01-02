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
          <h5 className='font-weight-bold'>Event Host</h5>
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
                primary50: '#f5f5f5',
                primary: '#000000',
              },
            })}
          />
        </div> 
        <div className="form-group">
          <h5 className='font-weight-bold'>Event Name</h5>
          <input type="text" className="form-control rounded-0" placeholder="Add a short, clear name"/>
        </div>            
        <div class="form-group">
          <h5 className='font-weight-bold'>Location</h5>
          <input type="text" className="form-control rounded-0" placeholder="Include a place or address"/>
        </div>
        <div class="form-group">
          <h5 className='font-weight-bold'>Start Date, Time</h5>
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
          <h5 className='font-weight-bold'>End Date, Time</h5>
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
          <h5 className='font-weight-bold'>Description</h5>
          <textarea className="form-control rounded-0" rows='3' placeholder="Tell people more about the event"/>
        </div>
        <hr/>
        <div class="form-check mb-3">
          <input class="form-check-input" type="radio" name="permission" checked/>
          <h5 class="form-check-label font-weight-bold mx-2">Public</h5>
          <small class="text-muted ml-2">Anyone can join this event.</small>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="permission"/>
          <h5 class="form-check-label font-weight-bold mx-2">Private</h5>
          <small class="text-muted ml-2">You choose who can join this event.</small>
        </div>
        <hr/>
        <button type="submit" class="btn btn-dark btn-lg rounded text-ddc213 font-weight-bold">Create Event</button>
      </form>
    )
  }
}

export default EventBasic