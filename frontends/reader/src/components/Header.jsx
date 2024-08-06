import { Link } from "react-router-dom";

export function Header() {
  return (
    <header>
      <nav className="navbar fixed-top bg-white border-bottom border-1">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Blog API
          </Link>
          <div className="ms-auto d-flex align-items-center">
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
          </div>
        </div>
      </nav>
    </header>
  );
}
