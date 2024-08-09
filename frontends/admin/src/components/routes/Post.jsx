import { Link, useParams, useOutletContext } from 'react-router-dom'
import { useState } from 'react'
import axios from '../../axios-instance'
import { formatDate } from '../../formatDate'

const AUTHOR_ID = '3519e331-3f78-4e80-8b79-22e5b6c3dd5e'

export function Post () {
  const { postId } = useParams()
  const [posts] = useOutletContext()
  const post = posts.find((post) => post.id === postId)
  const [commentText, setCommentText] = useState('')
  const [commentError, setCommentError] = useState('')
  const [loading, setLoading] = useState(false)

  if (!post) {
    return
  }

  const combinedDate = formatDate(post.updatedAt)

  async function handleCommentSubmit (event) {
    event.preventDefault()

    if (!commentText.trim()) {
      setCommentError('Comment cannot be empty')
      return
    }

    try {
      setLoading(true)
      const response = await axios.post(`/${postId}/comments`, {
        content: commentText,
        authorId: AUTHOR_ID
      })

      const { comment } = response.data

      setCommentText('')
      setCommentError('')
      post.comments.unshift(comment)
    } catch (error) {
      console.error(error)
      setCommentError('Failed to post comment')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='single-post'>
      <div className='card'>
        <div className='card-body d-flex flex-column justify-content-between'>
          <div className='mb-3'>
            <p className='card-text mb-1 small text-body-secondary'>
              Updated <span>{combinedDate}</span>
            </p>
            <h5 className='card-title'>{post.title}</h5>
            <div
              className='card-text'
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
          <div>
            <div className='d-flex justify-content-between'>
              <span className='me-2'>
                <i className='bi bi-chat' /> {post.comments.length}
              </span>
              <div>
                <Link to={`/${postId}/update`}>Update</Link>
                <Link to={`/${postId}/delete`} className='text-danger ms-2'>
                  Delete
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='comments my-3'>
        <h5>Comments ({post.comments.length})</h5>
        <div>
          <form
            className='my-3 border p-3 rounded'
            onSubmit={handleCommentSubmit}
            style={{ maxWidth: '600px' }}
          >
            <div className='mb-3'>
              <label htmlFor='comment' className='form-label'>
                Add Comment
              </label>
              <textarea
                name='comment'
                id='comment'
                className='form-control'
                rows='7'
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              {commentError && (
                <div className='text-danger mt-1'>{commentError}</div>
              )}
            </div>
            <button
              className='btn btn-primary'
              type='submit'
              disabled={loading}
            >
              Submit
            </button>
          </form>
        </div>
        <div className='border my-3 p-3 rounded'>
          <div className='list-group list-group-flush'>
            {post.comments.map((comment) => (
              <div key={comment.id} className='list-group-item'>
                <p className='card-text mb-1 small'>
                  <Link>@{comment.author.username}</Link>
                  <span className='mx-1 text-body-secondary'>|</span>
                  <span className='text-body-secondary'>
                    {formatDate(comment.updatedAt)}
                  </span>
                </p>
                <p className='mb-0'>{comment.content}</p>
                <div className='d-flex'>
                  <div className='ms-auto'>
                    <Link to={`/${comment.id}/update`}>Update</Link>
                    <Link
                      to={`/${comment.id}/delete`}
                      className='text-danger ms-2'
                    >
                      Delete
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
