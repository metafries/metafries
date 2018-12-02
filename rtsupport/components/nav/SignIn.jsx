import React from 'react'

const SignIn = ({handleSignIn}) => {
  return (
    <li className="nav-item delay-5"><a onClick={handleSignIn} className="nav-link" href="#">SIGN IN</a></li>
  )
}

export default SignIn
