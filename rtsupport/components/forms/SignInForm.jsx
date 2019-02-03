import React, { Component } from 'react'
import { connect } from 'react-redux'
import { login } from '../auth/authActions.jsx'

const actions = {
    login
}

class SignInForm extends Component {
    handleLogin = (e) => {
        e.preventDefault()
        this.props.login({
            email: $('input[name=email]').val(),
            password: $('input[name=password]').val(),
        })
    }
    render() {
        return (
            <form onSubmit={this.handleLogin}>
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
                    SIGN IN
                </button>        
            </form>
        )
    }
}

export default connect(null, actions)(SignInForm)
