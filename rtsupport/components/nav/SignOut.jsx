import React from "react";

const SignOut = ({firebaseProfile, handleSignOut}) => {
  return (
    <li className="nav-item delay-7">
      <a onClick={handleSignOut} className="nav-link d-inline px-2" href="/">
        <img
          src={firebaseProfile.avatarUrl || "/static/images/whazup-square-logo.png"}
          class="rounded-circle signout mr-2"
          alt="..."
        />
        SIGN OUT
      </a>
    </li>
  );
};

export default SignOut;
