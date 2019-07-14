import React from "react";

const SignOut = ({handleSignOut}) => {
  return (
    <li className="nav-item delay-7">
      <a onClick={handleSignOut} className="nav-link d-inline px-2" href="/">
        <i class="fas fa-sign-out-alt signout text-center mr-2"></i>SIGN OUT
      </a>
    </li>
  );
};

export default SignOut;
