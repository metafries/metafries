import React, { Component } from 'react'

const validInput = 'form-control rounded-0'
const invalidInput = 'form-control rounded-0 input-err'
const hideErrMsg = 'red-text d-none'
const showErrMsg = 'red-text d-block'

class Account extends Component {
  state = {
    new_password_input: validInput,
    confirm_new_password_input: validInput,
    confirm_new_password_err_msg: hideErrMsg,
  }
  handleConfirmation = (e) => {
    $('input[name=new_password]').val() != 
    $('input[name=confirm_new_password]').val()
    ? this.setState({
        confirm_new_password_input: invalidInput,
        confirm_new_password_err_msg: showErrMsg,
      })
    : this.setState({
        confirm_new_password_input: validInput,
        confirm_new_password_err_msg: hideErrMsg,
      })
  }
  render() {
    const {
      new_password_input,
      confirm_new_password_input,
      confirm_new_password_err_msg,
    } = this.state
    return (
      <div>
        <h3 className='mb-0 font-weight-bold'>Change Password</h3>
        <hr/>
        <form>
          <div className="form-group">
              <h5>New Password</h5>
              <input 
                name='new_password'
                type="password" 
                className={new_password_input}
                onChange={this.handleConfirmation}                
              />
          </div>
          <div className="form-group">
              <h5>Confirm New Password</h5>
              <input 
                name='confirm_new_password'
                type="password" 
                className={confirm_new_password_input}
                onChange={this.handleConfirmation}
              />
              <small className={confirm_new_password_err_msg}>
                Password confirmation doesn't match the password.
              </small>
          </div>
          <hr/>
          <button 
              type="submit" 
              class="btn btn-dark btn-lg rounded-0 text-ddc213 font-weight-bold">
              Update Password
          </button>          
        </form>         
      </div>
    )
  }
}

export default Account