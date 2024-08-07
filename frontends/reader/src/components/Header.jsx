import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export function Header({ user }) {
  return (
    <header>
      <nav className="navbar fixed-top bg-white border-bottom border-1">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Blog API
          </Link>
          <div className="ms-auto d-flex align-items-center">
            {user ? (
              <>
                <span className="d-flex align-items-center">
                  <i className="bi bi-person me-1"></i> {user.firstName}
                </span>
                <span className="mx-3">|</span>
                <Link to="/log-out" className="d-flex align-items-center">
                  <i className="bi bi-box-arrow-right me-1"></i> Log out
                </Link>
              </>
            ) : (
              <ol className="breadcrumb mb-0">
                <li className="breadcrumb-item">
                  <Link to="/login" className="d-flex align-items-center">
                    Log in
                  </Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to="/signup" className="d-flex align-items-center">
                    Sign up
                  </Link>
                </li>
              </ol>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

Header.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
  }),
};
