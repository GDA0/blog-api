import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const [errs, setErrs] = useState([]);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  async function onSubmit(data) {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/signup",
        data
      );
      if (response.data.errors?.length) {
        setErrs(response.data.errors);
      } else {
        setMsg(response.data.msg);
        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const password = watch("password");

  return (
    <div className="mx-auto" style={{ maxWidth: "540px" }}>
      <h2 className="text-center">Sign up</h2>

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
        <div className="mb-3 row">
          <div className="col">
            <label htmlFor="firstName" className="form-label">
              First name
            </label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              autoFocus
              {...register("firstName", {
                required: "First name is required",
                validate: {
                  notEmpty: (value) =>
                    value.trim() !== "" || "First name is required",
                },
              })}
            />
            {errors.firstName && (
              <span className="text-danger">{errors.firstName.message}</span>
            )}
          </div>
          <div className="col">
            <label htmlFor="lastName" className="form-label">
              Last name
            </label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              {...register("lastName", {
                required: "Last name is required",
                validate: {
                  notEmpty: (value) =>
                    value.trim() !== "" || "Last name is required",
                },
              })}
            />
            {errors.lastName && (
              <span className="text-danger">{errors.lastName.message}</span>
            )}
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
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
              validate: {
                notEmpty: (value) =>
                  value.trim() !== "" || "Username is required",
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
            autoComplete="new-password"
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
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm password
          </label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            autoComplete="new-password"
            {...register("confirmPassword", {
              required: "Confirm password is required",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
          />
          {errors.confirmPassword && (
            <span className="text-danger">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </form>
      <p className="text-center">
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </div>
  );
}
