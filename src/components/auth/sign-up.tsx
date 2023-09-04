import React, { useState } from "react";

interface signUpType {
  changeLoginToSignUp: () => void;
}

export default function SignUp({ changeLoginToSignUp }: signUpType) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState("");

  const signUp = async (e: React.PointerEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://photo-tagging-app-api-production.up.railway.app/sign-up",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: password,
            passwordConfirmation: confirmPassword,
          }),
        }
      );
      changeLoginToSignUp();
    } catch (err) {
      if (typeof err === "string") {
        setErrors(err.toUpperCase());
      } else if (err instanceof Error) {
        setErrors(err.message);
      }
    }
  };

  return (
    <form action="na" id="sign-up-form" className="auth-form">
      <label htmlFor="username-sign-up" className="form-group">
        Username:
        <input
          type="text"
          id="username-sign-up"
          className="form-field"
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label htmlFor="password-sign-up" className="form-group">
        Password:
        <input
          type="password"
          id="password-sign-up"
          className="form-field"
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <label htmlFor="confirm-password" className="form-group">
        Confirm Password:
        <input
          type="password"
          id="confirm-password"
          className="form-field"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </label>
      <div className="error">{errors}</div>
      <button id="sign-up-btn" onClick={signUp}>
        Sign Up
      </button>
      <button id="go-back-btn" onClick={changeLoginToSignUp}>
        Go Back
      </button>
    </form>
  );
}
