import React, { useState } from "react";

interface loginType {
  changeLoginToSignUp: () => void;
  start: () => void;
}

export default function Login({ changeLoginToSignUp, start }: loginType) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");

  const fetchLogin = async (username: string, password: string) => {
    try {
      const response = await fetch(
        "https://photo-tagging-app-api-production.up.railway.app/login",
        {
          mode: "cors",
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        }
      );
      const responseJSON = await response.json();
      if (response.status === 200) {
        localStorage.setItem("token", `bearer ${responseJSON.token}`);
        start();
      } else {
        throw new Error(responseJSON.errors);
      }
    } catch (err) {
      if (typeof err === "string") {
        setErrors(err.toUpperCase());
      } else if (err instanceof Error) {
        setErrors(err.message);
      }
    }
  };

  const tryMe = async (e: React.PointerEvent<HTMLButtonElement>) => {
    e.preventDefault();
    fetchLogin("anonymous", "12345");
  };

  const login = async (e: React.PointerEvent<HTMLButtonElement>) => {
    e.preventDefault();
    fetchLogin(username, password);
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
      <div className="error">{errors}</div>
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
