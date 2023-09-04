import React, { useState } from "react";
import "./login.css";

import SignUp from "./sign-up";
import Login from "./login";

interface authType {
  start: () => void;
}

export default function Auth({ start }: authType) {
  const [showSignUp, setShowSignUp] = useState(false);

  const changeLoginToSignUp = () => {
    setShowSignUp(!showSignUp);
  };

  const loginPage = () => {
    return <Login changeLoginToSignUp={changeLoginToSignUp} start={start} />;
  };

  const signUpPage = () => {
    return <SignUp changeLoginToSignUp={changeLoginToSignUp} />;
  };

  return (
    <div id="login-page">
      <h1 className="title-login">Where's Waldo</h1>
      {showSignUp ? signUpPage() : loginPage()}
    </div>
  );
}
