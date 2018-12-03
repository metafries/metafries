import React from "react";

const SignOut = ({handleSignOut}) => {
  return (
    <li className="nav-item delay-7">
      <div className="contact float-left px-1 py-1">
        <img
          src="./static/images/whazup-square-logo.png"
          class="img-fluid rounded-circle"
          alt="..."
        />
      </div>
      <a onClick={handleSignOut} className="nav-link d-inline px-2" href="/login">
        SIGN OUT
      </a>
    </li>
  );
};

export default SignOut;
