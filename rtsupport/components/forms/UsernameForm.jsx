import React, { Component } from 'react'

class UsernameForm extends Component {
  state = {
    usernameInput: this.props.username,
    usernameInputLength: this.props.username.trim().length,
    username_err_msg: false,
  }
  onInputChange = (e) => {
    const username = e.target.value
    this.setState({
        usernameInput: username,
        usernameInputLength: username.trim().length
    })
    username.trim().length === 0
        ? this.setState({username_err_msg: true})  
        : this.setState({username_err_msg: false})  
  }
  handleSignup = (e) => {
    e.preventDefault()
    const {usernameInput} = this.state
    if (usernameInput.trim().length !== 0) {
        this.props.useThirdParty(this.props.provider, usernameInput)
    }
  }
  render() {
    const {usernameInput, usernameInputLength, username_err_msg} = this.state
    return (
        <form onSubmit={this.handleSignup}>
            <small className='float-right'>{usernameInputLength}/64</small>
            <div class="input-group mb-3 border border-white">
                <div class="input-group-prepend pb-0 pt-2 px-2 text-dark bg-white">         
                    <h6 className='mb-0'><i class="fas fa-user icon text-center"></i></h6>
                </div>
                <input 
                    onChange={this.onInputChange}
                    maxlength='64'
                    type="text" 
                    class="form-control rounded-0" 
                    placeholder='Username'
                    value={usernameInput}
                />
            </div>
            <button 
                type="submit" 
                className="btn btn-dark output-btn btn-lg rounded-0 font-weight-bold py-0 w-100"
                >
                REGISTER
            </button>         
            {
                username_err_msg &&
                <h6 className='input-err-msg my-3 p-2'>
                    <i class="fas fa-exclamation-circle mr-2"></i>
                    Username is required.
                </h6>          
            }                
        </form>
    )
  }
}

export default UsernameForm