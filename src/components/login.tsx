import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useEffect, useState } from "react";

export default function Login(props: { app: any; start: () => void }) {
  const [showSignUp, setShowSignUp] = useState(false);

  const auth = getAuth(props.app);

  const changeLoginToSignUp = (e: React.PointerEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowSignUp(!showSignUp);
  };

  const login = async (e: React.PointerEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(auth);
    const userEmail = document.getElementById("username") as HTMLInputElement;
    const userPassword = document.getElementById(
      "password"
    ) as HTMLInputElement;
    console.log(userPassword);
    try {
      const userCreditional = await signInWithEmailAndPassword(
        auth,
        userEmail.value,
        userPassword.value
      );
      console.log(userCreditional);
      props.start();
    } catch (error: any) {
      console.log(error);
    }
  };

  const signUp = async (e: React.PointerEvent<HTMLButtonElement>) => {
    e.preventDefault();
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
          <button id="try-me-btn">Try Me</button>
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

  return <div id="login-page">{showSignUp ? signUpPage() : loginPage()}</div>;
}
