import { Link } from "react-router-dom";

export function Signup() {
  return (
    <div className="mx-auto" style={{ maxWidth: "540px" }}>
      <h2 className="text-center">Sign up</h2>
      <form className="my-3" action="/signup" method="post">
        <div className="mb-3 row">
          <div className="col">
            <label htmlFor="firstName" className="form-label">
              First name
            </label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              name="firstName"
              autoFocus
            />
          </div>
          <div className="col">
            <label htmlFor="lastName" className="form-label">
              Last name
            </label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              name="lastName"
            />
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
            name="username"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            autoComplete="new-password"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm password
          </label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            name="confirmPassword"
            autoComplete="new-password"
          />
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
