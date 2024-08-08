import { Link, useParams, useOutletContext } from "react-router-dom";
import { useState } from "react";
import axios from "../../axios-instance";
import { formatDate } from "../../formatDate";

export function Post() {
  const { postId } = useParams();
  const [user, posts] = useOutletContext();
  const post = posts.find((post) => post.id === postId);
  const [commentText, setCommentText] = useState("");
  const [commentError, setCommentError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!post) {
    return <div>Post not found</div>;
  }

  const combinedDate = formatDate(post.updatedAt);

  async function handleCommentSubmit(event) {
    event.preventDefault();

    if (!commentText.trim()) {
      setCommentError("Comment cannot be empty");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`/${postId}/comments`, {
        content: commentText,
        authorId: user.id,
      });

      const { comment } = response.data;

      setCommentText("");
      setCommentError("");
      post.comments.unshift(comment);
    } catch (error) {
      console.error(error);
      setCommentError("Failed to post comment");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="single-post">
      <div className="card">
        <div className="card-body d-flex flex-column justify-content-between">
          <div className="mb-3">
            <p className="card-text mb-1 small">
              <Link to="/">@{post.author.username}</Link> |{" "}
              <span className="text-body-secondary">{combinedDate}</span>
            </p>
            <h5 className="card-title">{post.title}</h5>
            <p className="card-text">{post.content}</p>
          </div>
          <div className="d-flex justify-content-between">
            <div>
              <span className="me-2">
                <i className="bi bi-chat"></i> {post.comments.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="comments my-3">
        <h5>Comments ({post.comments.length})</h5>
        <div>
          {user ? (
            <form
              className="my-3 border p-3 rounded"
              onSubmit={handleCommentSubmit}
              style={{ maxWidth: "600px" }}
            >
              <div className="mb-3">
                <label htmlFor="comment" className="form-label">
                  Add Comment
                </label>
                <textarea
                  name="comment"
                  id="comment"
                  className="form-control"
                  rows={"7"}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                ></textarea>
                {commentError && (
                  <div className="text-danger mt-1">{commentError}</div>
                )}
              </div>
              <button
                className="btn btn-primary"
                type="submit"
                disabled={loading}
              >
                Submit
              </button>
            </form>
          ) : (
            <p>
              <Link to="/login">Log in</Link> to add a comment.
            </p>
          )}
        </div>
        <div className="border my-3 p-3 rounded">
          <div className="list-group list-group-flush">
            {post.comments.map((comment) => (
              <div key={comment.id} className="list-group-item">
                <p className="card-text mb-1 small">
                  <Link>@{comment.author.username}</Link>
                  <span className="mx-1 text-body-secondary">|</span>
                  <span className="text-body-secondary">
                    {formatDate(comment.updatedAt)}
                  </span>
                </p>
                <p className="mb-0">{comment.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
