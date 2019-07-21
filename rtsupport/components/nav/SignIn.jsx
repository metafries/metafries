import React from 'react'

const SignIn = ({handleSignIn}) => {
  return (
    <li className="nav-item delay-1">
      <a onClick={handleSignIn} className="nav-link px-2" href="/">
      <i class="fas fa-sign-in-alt signout text-center mr-2"></i>SIGN IN
      </a>
    </li>
  )
}

export default SignIn
