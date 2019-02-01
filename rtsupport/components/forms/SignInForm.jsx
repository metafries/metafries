import React from 'react'

const SignInForm = () => {
  return (
    <form>
        <div class="input-group mb-3 border border-white">
            <div class="input-group-prepend p-2 text-dark bg-white">
                <h6 className='mb-0'><i class="fas fa-envelope icon text-center"></i></h6>
            </div>
            <input type="email" class="form-control rounded-0" placeholder="Email"/>
        </div>
        <div class="input-group mb-3 border border-white">
            <div class="input-group-prepend p-2 text-dark bg-white">
                <h6 className='mb-0'><i class="fas fa-lock icon text-center"></i></h6>
            </div>
            <input type="password" class="form-control rounded-0" placeholder="Password"/>
        </div>
        <button 
            type="button" 
            className="btn btn-outline-light btn-lg rounded-0 font-weight-bold py-0 w-100 l-btn"
        >
            SIGN IN
        </button>        
    </form>
  )
}

export default SignInForm
