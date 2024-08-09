import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

export function Header ({ user }) {
  return (
    <header>
      <nav className='navbar fixed-top bg-white border-bottom border-1'>
        <div className='container'>
          <Link className='navbar-brand'>
            Blog API{' '}
            <sup>
              <small>
                <small>Reader</small>
              </small>
            </sup>
          </Link>
          <div className='ms-auto d-flex align-items-center'>
            {user
              ? (
                <Link to='/profile' className='d-flex align-items-center fs-5'>
                  <i className='bi bi-person me-1' /> {user.firstName}
                </Link>
                )
              : (
                <ol className='breadcrumb mb-0'>
                  <li className='breadcrumb-item'>
                    <Link to='/login' className='d-flex align-items-center'>
                      Log in
                    </Link>
                  </li>
                  <li className='breadcrumb-item'>
                    <Link to='/signup' className='d-flex align-items-center'>
                      Sign up
                    </Link>
                  </li>
                </ol>
                )}
          </div>
        </div>
      </nav>
    </header>
  )
}

Header.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string.isRequired
  })
}
