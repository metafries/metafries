import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signup } from '../auth/authActions.jsx'

const actions = {
    signup
}

class SignUpForm extends Component {
    handleSignup = (e) => {
        e.preventDefault()
        this.props.signup({
            username: $('input[name=username]').val(),
            email: $('input[name=email]').val(),
            password: $('input[name=password]').val(),
        })
    }
    render() {
        return (
        <form onSubmit={this.handleSignup}>
            <div class="input-group mb-3 border border-white">
                <div class="input-group-prepend p-2 text-dark bg-white">
                    <h6 className='mb-0'><i class="fas fa-user icon text-center"></i></h6>
                </div>
                <input 
                    type="text" 
                    class="form-control rounded-0" 
                    placeholder="Username"
                    name='username'
                />
            </div>          
            <div class="input-group mb-3 border border-white">
                <div class="input-group-prepend p-2 text-dark bg-white">
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
                <div class="input-group-prepend p-2 text-dark bg-white">
                    <h6 className='mb-0'><i class="fas fa-lock icon text-center"></i></h6>
                </div>
                <input 
                    type="password" 
                    class="form-control rounded-0" 
                    placeholder="Password"
                    name='password'
                />
            </div>
            <button 
                type="submit" 
                className="btn btn-outline-light btn-lg rounded-0 font-weight-bold py-0 w-100 l-btn"
            >
                SIGN UP
            </button>                
        </form>
        )
    }
}

export default connect(null, actions)(SignUpForm)