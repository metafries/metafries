import React, { Component } from 'react'

const validInput = 'form-control rounded-0'
const invalidInput = 'form-control rounded-0 input-err'
const hideErrMsg = 'red-text d-none'
const showErrMsg = 'red-text d-block'

class Account extends Component {
  state = {
    creds: {
      new_password: '',
      confirm_new_password: '',
    },
    new_password_input: validInput,
    confirm_new_password_input: validInput,
    confirm_new_password_err_msg: hideErrMsg,
  }
  reset = () => {
    if (this.props.auth.updatePwdInform) {
      this.props.auth.updatePwdInform = null
      this.setState({
        creds: {
          new_password: '',
          confirm_new_password: '',
        },    
      })
    }
  }
  handleConfirmation = (e) => {    
    const userInput = this.state.creds
    userInput[e.target.name] = e.target.value
    this.setState({
      creds: userInput
    })
    const {creds} = this.state
    creds.new_password != creds.confirm_new_password
    ? this.setState({
        confirm_new_password_input: invalidInput,
        confirm_new_password_err_msg: showErrMsg,
      })
    : this.setState({
        confirm_new_password_input: validInput,
        confirm_new_password_err_msg: hideErrMsg,
      })  
  }
  handleSubmit = (e) => {
    e.preventDefault()    
    const {creds} = this.state
    if (creds.new_password == creds.confirm_new_password) {
      this.props.updatePassword(creds)
    }
  }
  render() {
    const {
      creds,
      new_password_input,
      confirm_new_password_input,
      confirm_new_password_err_msg,
    } = this.state
    const {auth} = this.props
    return (
      <div>
        <h3 className='mb-0 font-weight-bold'>Change Password</h3>
        <hr/>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
              <h5>New Password</h5>
              <input 
                value={auth.updatePwdInform ? '' : creds.new_password}
                onFocus={this.reset}
                name='new_password'
                type="password" 
                className={new_password_input}
                onChange={this.handleConfirmation}                
              />
          </div>
          <div className="form-group">
              <h5>Confirm New Password</h5>
              <input 
                value={auth.updatePwdInform ? '' :creds.confirm_new_password}
                onFocus={this.reset}                
                name='confirm_new_password'
                type="password" 
                className={confirm_new_password_input}
                onChange={this.handleConfirmation}
              />
              <small className={confirm_new_password_err_msg}>
                Password confirmation doesn't match the password.
              </small>
          </div>
          {
            auth.updatePwdError &&
            <h6 className='input-err-msg mb-3 p-2'>
              <i class="fas fa-exclamation-triangle mr-2"></i>
              {auth.updatePwdError.message}
            </h6>
          }          
          {
            auth.updatePwdInform &&
            <h6 className='input-ok-msg mb-3 p-2'>
              <i class="fas fa-check-circle mr-2"></i>
              {auth.updatePwdInform.message}
            </h6>          
          }
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