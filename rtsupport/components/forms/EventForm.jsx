import React, { Component } from 'react'
import Select from 'react-select'
import { DateTimePicker, MuiPickersUtilsProvider } from 'material-ui-pickers';
import LuxonUtils from '@date-io/luxon';
import { DateTime } from "luxon";

class EventForm extends Component {
  state = {
    selectedOption: null,    
    event: this.props.event,
    isEmptyTitle: true,
    title_err_msg: 'input-err-msg d-none',
    title_input: 'form-control rounded-0',
    selectedStartDateError: false,
    selectedEndDateError: false,
  }
  componentDidMount() {
    const {event} = this.props
    this.setState({
      selectedOption: { 
        label: event.hostedBy, 
        value: event.hostedBy 
      },
    })  
  }
  isNotEmptyTitle = (e) => {
    if (e.target.value.trim().length == 0) {      
      this.setState({
        title_err_msg: 'input-err-msg d-block',
        title_input: 'form-control rounded-0 input-err',        
      })  
    } else {
      this.setState({
        isEmptyTitle: false,                
        title_err_msg: 'input-err-msg d-none',
        title_input: 'form-control rounded-0',                
      })  
    }
  }
  handleChange = (selectedOption) => {
    this.setState({ 
      selectedOption 
    });
    const update = this.state.event;
    update.hostedBy = selectedOption.value
    this.setState({
      event: update
    })
  }
  handlePermissionChange = (e) => {
    const update = this.state.event;
    update.permission = e.target.value
    this.setState({
      event: update
    })
  }
  handleStartDateChange = (date) => {
    const update = this.state.event;
    update.startDate = date.toFormat('yyyy/MM/dd, HH:mm')
    this.setState({
        event: update
    });
  };
  handleEndDateChange = (date) => {
    const update = this.state.event;
    update.endDate = date.toFormat('yyyy/MM/dd, HH:mm')
    this.setState({
        event: update
    });
  };
  isValidDateTime = () => {
    const {event, selectedStartDateError} = this.state
    const showStartDate = DateTime.fromFormat(event.startDate, 'yyyy/MM/dd, HH:mm')
    const showEndDate = DateTime.fromFormat(event.endDate, 'yyyy/MM/dd, HH:mm')

    this.setState({
      selectedStartDateError: showStartDate < DateTime.local(),
      selectedEndDateError: showEndDate < showStartDate
    })

    if (!selectedStartDateError) {
      if (showEndDate < showStartDate) {
        const update = this.state.event;
        update.endDate = update.startDate
        this.setState({
          event: update
        })
      }  
    }
  }
  onInputChange = (e) => {
    const userInput = this.state.event;
    userInput[e.target.name] = e.target.value;
    this.setState({
      event: userInput
    })
  }
  onFormSubmit = (e) => {
    e.preventDefault();
    this.isValidDateTime()
    const {event, isEmptyTitle, selectedStartDateError, selectedEndDateError} = this.state
    if (isEmptyTitle) {
      this.setState({
        title_err_msg: 'input-err-msg d-block',
        title_input: 'form-control rounded-0 input-err',        
      })  
    } else if (!selectedStartDateError && !selectedEndDateError) {
      if (this.props.isManage) {
        this.props.handleUpdateEvent(event)          
      } else {
        this.props.handleCreateEvent(event)                  
      }
    }
  }
  render() {
    const {
      selectedOption, 
      event, 
      title_err_msg, 
      title_input,       
      selectedStartDateError, 
      selectedEndDateError
    } = this.state;
    const showStartDate = DateTime.fromFormat(event.startDate, 'yyyy/MM/dd, HH:mm')
    const showEndDate = DateTime.fromFormat(event.endDate, 'yyyy/MM/dd, HH:mm')
    return (
      <form onSubmit={this.onFormSubmit}>
        <div className="form-group">
          <h5 className='font-weight-bold'>Event Host</h5>
          <Select
            className='w-auto'
            value={selectedOption}
            onChange={this.handleChange}
            options={this.props.options}
            theme={(theme) => ({
              ...theme,
              borderRadius: 0,
              colors: {
              ...theme.colors,
                primary25: '#f5f5f5',
                primary50: '#f5f5f5',
                primary: '#303aa5',
              },
            })}
          />
        </div> 
        <div className="form-group">
          <h5 className='font-weight-bold'>Event Title</h5>
          <input 
            name='title'                                                  
            onBlur={this.isNotEmptyTitle}                                                
            onChange={this.onInputChange}                                 
            value={event.title}            
            type="text" 
            className={title_input} 
            placeholder="Add a short, clear name"
          />
          <small className={title_err_msg}>Add a clear title for your event.</small>
        </div>            
        <div class="form-group">
          <h5 className='font-weight-bold'>Location</h5>
          <input 
            name='location'
            onChange={this.onInputChange} 
            value={event.location} 
            type="text" 
            className="form-control rounded-0" 
            placeholder="Include a place or address"
          />
        </div>
        <div class="form-group">
          <h5 className='font-weight-bold'>Start Date, Time</h5>
          <MuiPickersUtilsProvider utils={LuxonUtils}>
            <div className="picker ml-2">
              <DateTimePicker
                className='w-100'
                value={showStartDate}
                onChange={this.handleStartDateChange}    
                showTodayButton    
                minDate={DateTime.min(
                  DateTime.local().minus({days:1}),
                  showStartDate.minus({days:1})       
                )}                
                onFocus={this.isValidDateTime}                                
                error={selectedStartDateError}                        
                {...(selectedStartDateError ? 
                  { helperText: "An event can't be created in the past." } : {}
                )}                
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
                value={showEndDate}
                onChange={this.handleEndDateChange}    
                showTodayButton    
                minDate={DateTime.min(
                  showEndDate.minus({days:1}),
                  showStartDate.minus({days:1})
                )} 
                onFocus={this.isValidDateTime}
                error={this.state.selectedEndDateError}                        
                {...(selectedEndDateError ? 
                  { helperText: "The event end time must be after the start time." } : {}
                )}                 
              />
            </div>
          </MuiPickersUtilsProvider>
        </div>
        <div class="form-group">
          <h5 className='font-weight-bold'>Description</h5>
          <textarea 
            name='description'
            onChange={this.onInputChange} 
            value={event.description}
            className="form-control rounded-0" 
            rows='3' 
            placeholder="Tell people more about the event"
          />
        </div>
        <hr/>
        <div class="form-check mb-3">
          <input 
            type="radio"
            name="permission"
            value={0}   
            checked={event.permission == 0}   
            onChange={this.handlePermissionChange}                              
            class="form-check-input"               
          />
          <h5 class="form-check-label font-weight-bold mx-2">Public</h5>
          <small class="text-muted ml-2">Anyone can join this event.</small>
        </div>
        <div class="form-check">
          <input 
            type="radio" 
            name="permission"
            value={1} 
            checked={event.permission == 1}
            onChange={this.handlePermissionChange}
            class="form-check-input" 
          />
          <h5 class="form-check-label font-weight-bold mx-2">Private</h5>
          <small class="text-muted ml-2">You choose who can join this event.</small>
        </div>
        <hr/>
        {
          this.props.isManage
          ? <button 
              type="submit" 
              class="btn btn-dark btn-lg rounded-0 text-ddc213 font-weight-bold">
              Update Event
            </button>
          : <button 
              type="submit" 
              class="btn btn-dark btn-lg rounded-0 text-ddc213 font-weight-bold">
              Create Event
            </button>          
        }
      </form>
    )
  }
}

export default EventForm