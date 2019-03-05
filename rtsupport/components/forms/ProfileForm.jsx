import React, { Component } from 'react'
import { 
    VALID_INPUT, 
    INVALID_INPUT,
    HIDE_ERR_MSG,
    SHOW_ERR_MSG,
} from './formConstants.jsx'

class ProfileForm extends Component {
    state = {
        username_input: VALID_INPUT,  
        username_err_msg: HIDE_ERR_MSG,      
        usernameInputLength: this.props.fba.displayName.length,
        profile: {
            username: this.props.fba.displayName,
        }
    }
    onInputChange = (e) => {
        const userInput = this.state.profile
        userInput[e.target.name] = e.target.value
        this.setState({
            profile: userInput
        })
        if (e.target.name == 'username') {
            this.setState({
                usernameInputLength: e.target.value.trim().length
            })
            if (e.target.value.trim().length == 0) {      
                this.setState({
                  username_err_msg: SHOW_ERR_MSG,
                  username_input: INVALID_INPUT,        
                })  
            } else {
                this.setState({
                    username_err_msg: HIDE_ERR_MSG,
                    username_input: VALID_INPUT,                
                })  
            }          
        }
    }
    render() {
        const {
            username_input, 
            username_err_msg, 
            usernameInputLength, 
            profile,
        } = this.state
        return (
            <form>
                <div className="form-group">
                    <small className='float-right'>{usernameInputLength}/64</small>
                    <h5 className='font-weight-bold'>Username</h5>
                    <input 
                        maxlength='64'
                        type="text" 
                        class={username_input} 
                        name='username'
                        value={profile.username}
                        onChange={this.onInputChange}
                    />
                    <small className={username_err_msg}>
                        <i class="fas fa-exclamation-triangle mr-1"></i>
                        Username is required.
                    </small>
                </div>   
                <hr/>
                <button 
                    type="button" 
                    class="btn btn-dark btn-lg rounded-0 text-ddc213 font-weight-bold">
                    Update Profile
                </button>         
            </form>
        )
    }
}

export default ProfileForm