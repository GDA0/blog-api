import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { formatDate } from '../formatDate'

const Card = ({ id, title, content, author, updatedAt, commentsCount }) => {
  const excerpt =
    content.length > 100 ? content.substring(0, 100) + '...' : content

  const combinedDate = formatDate(updatedAt)

  return (
    <div className='card h-100'>
      <div className='card-body d-flex flex-column justify-content-between'>
        <div className='mb-3'>
          <p className='card-text mb-1 small'>
            <Link to='/'>@{author}</Link> |{' '}
            <span className='text-body-secondary'>{combinedDate}</span>
          </p>
          <h5 className='card-title'>{title}</h5>
          <div
            className='card-text'
            dangerouslySetInnerHTML={{ __html: excerpt }}
          />
        </div>
        <div className='d-flex justify-content-between'>
          <Link className='card-link' to={`/${id}`}>
            Read More
          </Link>
          <div>
            <span className='me-2'>
              <i className='bi bi-chat' /> {commentsCount}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

Card.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
  commentsCount: PropTypes.number.isRequired
}

export default Card
