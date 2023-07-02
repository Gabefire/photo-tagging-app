import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signInAnonymously,
} from "firebase/auth";
import React, { useState } from "react";
import "./login.css";

export default function Login(props: { app: any; start: () => void }) {
  const [showSignUp, setShowSignUp] = useState(false);

  const auth = getAuth(props.app);

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
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        userEmail.value,
        userPassword.value
      );
      console.log(userCredentials);
      props.start();
    } catch (error: any) {
      console.log(error);
    }
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
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        userEmail.value,
        userPassword.value
      );
      if (auth.currentUser !== null) {
        await updateProfile(auth.currentUser, {
          displayName: displayName.value,
        });
      }
      console.log(userCredentials);
      setShowSignUp(!showSignUp);
    } catch (error: any) {
      console.log(error);
    }
  };

  const tryMe = async (e: React.PointerEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const userCredentials = await signInAnonymously(auth);
      console.log(userCredentials);
      props.start();
    } catch (error: any) {
      console.log(error);
    }
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