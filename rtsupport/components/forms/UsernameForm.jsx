import React, { Component } from 'react'

class UsernameForm extends Component {
  render() {
    return (
        <form className='mt-3'>
            <div class="input-group mb-3 border border-white">
                <div class="input-group-prepend pb-0 pt-2 px-2 text-dark bg-white">         
                    <h6 className='mb-0'><i class="fas fa-user icon text-center"></i></h6>
                </div>
                <input 
                    onChange={this.onInputChange}
                    maxlength='64'
                    type="text" 
                    class="form-control rounded-0" 
                    placeholder={this.props.username}
                    name='username'
                />
            </div>
        </form>
    )
  }
}

export default UsernameForm