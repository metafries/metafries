import React from "react";

const SignOut = ({handleSignOut}) => {
  return (
    <li className="nav-item delay-7">
      <a onClick={handleSignOut} className="nav-link d-inline px-2" href="/">
        SIGN OUT
        <img
          src="/static/images/whazup-square-logo.png"
          class="rounded-circle signout mx-2"
          alt="..."
        />
      </a>
    </li>
  );
};

export default SignOut;
