/* eslint-disable react/no-unescaped-entities */
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import { redirectTo } from "../../redirectTo";

export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [errs, setErrs] = useState([]);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    token && redirectTo("/");
  }, []);

  async function onSubmit(data) {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/login",
        data
      );
      const { msg, token, refreshToken } = response.data;

      setMsg(msg);
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);

      setTimeout(() => {
        // Navigate back
        window.history.back();

        // Refresh the previous page after a short delay
        setTimeout(() => {
          window.location.reload();
        }, 15);
      }, 1500);
    } catch (error) {
      if (!error.response) {
        return setErrs([
          {
            msg: "An error occurred during login up. Please try again later.",
          },
        ]);
      }
      setErrs(error.response.data.errors);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto" style={{ maxWidth: "540px" }}>
      <h2 className="text-center">Log In</h2>

      {loading && (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {errs.length > 0 && (
        <div className="alert alert-danger">
          <ul className="mb-0">
            {errs.map((err) => (
              <li key={err.msg}>{err.msg}</li>
            ))}
          </ul>
        </div>
      )}

      {msg && (
        <div className="alert alert-success" role="alert">
          {msg}
        </div>
      )}

      <form className="my-3" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            autoComplete="username"
            autoFocus
            {...register("username", {
              required: "Username is required",
              minLength: {
                value: 3,
                message: "Username must be between 3 and 20 characters long",
              },
              maxLength: {
                value: 20,
                message: "Username must be between 3 and 20 characters long",
              },
              pattern: {
                value: /^[a-zA-Z0-9_.]+$/,
                message:
                  "Username can only contain letters, numbers, underscores, or periods",
              },
            })}
          />
          {errors.username && (
            <span className="text-danger">{errors.username.message}</span>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            autoComplete="current-password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be between 8 and 64 characters long",
              },
              maxLength: {
                value: 64,
                message: "Password must be between 8 and 64 characters long",
              },
              pattern: {
                value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$/,
                message:
                  "Password must contain at least one uppercase letter, one lowercase letter, and one number",
              },
            })}
          />
          {errors.password && (
            <span className="text-danger">{errors.password.message}</span>
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          Log In
        </button>
      </form>
      <p className="text-center">
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
}
