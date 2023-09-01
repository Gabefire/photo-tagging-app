import React, { useState } from "react";
import "./login.css";

interface loginType {
  start: () => void;
}

export default function Login({ start }: loginType) {
  const [showSignUp, setShowSignUp] = useState(false);

  const changeLoginToSignUp = (e: React.PointerEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowSignUp(!showSignUp);
  };

  const login = async (e: React.PointerEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const userEmail = document.getElementById("username") as HTMLInputElement;
    const userPassword = document.getElementById(
      "password"
    ) as HTMLInputElement;
    // login api
  };

  const signUp = async (e: React.PointerEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const userEmail = document.getElementById(
      "username-sign-up"
    ) as HTMLInputElement;
    const userPassword = document.getElementById(
      "password-sign-up"
    ) as HTMLInputElement;
    const displayName = document.getElementById(
      "name-sign-up"
    ) as HTMLInputElement;
    // sign up api
  };

  const tryMe = async (e: React.PointerEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // try me
  };

  const loginPage = () => {
    return (
      <>
        <form action="na" id="login-form">
          <label htmlFor="username">
            Username:
            <input type="email" id="username" />
          </label>
          <label htmlFor="password">
            Password:
            <input type="password" id="password" />
          </label>
          <div id="error"></div>
          <button id="login-btn" onClick={login}>
            Login
          </button>
          <button id="sign-up-btn" onClick={changeLoginToSignUp}>
            Sign Up
          </button>
          <button id="try-me-btn" onClick={tryMe}>
            Try Me
          </button>
        </form>
      </>
    );
  };

  const signUpPage = () => {
    return (
      <>
        <form action="na" id="sign-up-form">
          <label htmlFor="name">
            Display Name:
            <input type="text" id="name-sign-up" />
          </label>
          <label htmlFor="username">
            Username:
            <input type="text" id="username-sign-up" className="username" />
          </label>
          <label htmlFor="password">
            Password:
            <input type="text" id="password-sign-up" className="password" />
          </label>
          <div id="error"></div>
          <button id="sign-up-btn" onClick={signUp}>
            Sign Up
          </button>
          <button id="go-back-btn" onClick={changeLoginToSignUp}>
            Go Back
          </button>
        </form>
      </>
    );
  };

  return (
    <div id="login-page">
      {" "}
      <h1 className="title-login">Where's Waldo</h1>
      {showSignUp ? signUpPage() : loginPage()}
    </div>
  );
}
