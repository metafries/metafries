import React, { Component } from 'react'
import { connect } from 'react-redux'
import githubUsernameRegex from 'github-username-regex';
import { signup } from '../auth/authActions.jsx'

const actions = {
    signup
}

class SignUpForm extends Component {
    state = {
        showUsernameRules: false,
        usernameInputLength: 0
    }
    onInputChange = (e) => {
        if (e.target.name == 'username') {
            this.setState({
                usernameInputLength: e.target.value.trim().length
            })
        }
    }
    handleSignup = (e) => {
        e.preventDefault()
        this.props.isEmptyUsername($('input[name=username]').val())
        if (!githubUsernameRegex.test($('input[name=username]').val())) {
            this.setState({
                showUsernameRules: true,
            })
        } else {
            this.setState({
                showUsernameRules: false,
            })
        }
        this.props.signup({
            username: $('input[name=username]').val(),
            email: $('input[name=email]').val(),
            password: $('input[name=password]').val(),
        })
    }
    render() {
        const {showUsernameRules, usernameInputLength} = this.state        
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
                    placeholder="Username"
                    name='username'
                />
            </div>          
            <div class="input-group mb-3 border border-white">
                <div class="input-group-prepend pb-0 pt-2 px-2 text-dark bg-white">
                    <h6 className='mb-0'><i class="fas fa-envelope icon text-center"></i></h6>
                </div>
                <input 
                    type="email" 
                    class="form-control rounded-0" 
                    placeholder="Email"
                    name='email'                        
                />
            </div>
            <div class="input-group mb-3 border border-white">
                <div class="input-group-prepend pb-0 pt-2 px-2 text-dark bg-white">
                    <h6 className='mb-0'><i class="fas fa-lock icon text-center"></i></h6>
                </div>
                <input 
                    type="password" 
                    class="form-control rounded-0" 
                    placeholder="Password"
                    name='password'
                />
            </div>
            {
                this.props.loading
                ?   <div className='text-center'>
                        <span 
                            class="spinner-border mr-2" 
                            role="status" 
                            aria-hidden="true"
                            >
                        </span>
                        <span className='h3'>
                            Processing...
                        </span>
                    </div>  
                :   <button 
                        type="submit" 
                        className="mb-3 btn btn-dark output-btn btn-lg rounded-0 font-weight-bold py-0 w-100"
                        >
                        SIGN UP
                    </button>    
            }
            {
                showUsernameRules &&
                <h6 className='input-err-msg mb-3 p-2'>
                    <i class="fas fa-exclamation-circle mr-2"></i>
                    Username 
                    [1] May only contain alphanumeric characters or hyphens. 
                    [2] Cannot have multiple consecutive hyphens.
                    [3] Cannot begin or end with a hyphen.
                </h6>
            }                    
        </form>
        )
    }
}

export default connect(null, actions)(SignUpForm)