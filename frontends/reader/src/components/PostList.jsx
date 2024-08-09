import PropTypes from 'prop-types'
import Card from './Card'

export function PostList ({ posts }) {
  return (
    <div className='row g-3'>
      {posts.map((post) => (
        <div key={post.id} className='col col-md-4'>
          <Card
            id={post.id}
            title={post.title}
            content={post.content}
            author={post.author.username}
            updatedAt={post.updatedAt}
            commentsCount={post.comments.length}
          />
        </div>
      ))}
    </div>
  )
}

PostList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      author: PropTypes.shape({
        username: PropTypes.string.isRequired
      }).isRequired,
      updatedAt: PropTypes.string.isRequired,
      comments: PropTypes.array.isRequired
    })
  ).isRequired
}
