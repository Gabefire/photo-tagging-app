import React, { useState } from "react";

interface loginType {
  changeLoginToSignUp: () => void;
  start: () => void;
}

export default function Login({ changeLoginToSignUp, start }: loginType) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e: React.PointerEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const userEmail = document.getElementById("username") as HTMLInputElement;
    const userPassword = document.getElementById(
      "password"
    ) as HTMLInputElement;
    // login api
  };

  const tryMe = async (e: React.PointerEvent<HTMLButtonElement>) => {
    e.preventDefault();
    start();
  };

  return (
    <form action="na" id="login-form" className="auth-form">
      <label htmlFor="username" className="form-group">
        Username:
        <input
          type="text"
          id="username"
          className="form-field"
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label htmlFor="password" className="form-group">
        Password:
        <input
          type="password"
          id="password"
          className="form-field"
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <div className="error"></div>
      <button id="login-btn" onClick={login} className="form-button">
        Login
      </button>
      <button
        id="sign-up-btn"
        onClick={changeLoginToSignUp}
        className="form-button"
      >
        Sign Up
      </button>
      <button id="try-me-btn" onClick={tryMe} className="form-button">
        Try Me
      </button>
    </form>
  );
}
