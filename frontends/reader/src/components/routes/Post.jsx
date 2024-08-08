import {
  formatDistanceToNow,
  formatRelative,
  format,
  subDays,
  getYear,
} from "date-fns";
import { Link, useParams, useOutletContext } from "react-router-dom";

export function Post() {
  const { postId } = useParams();
  const [, posts] = useOutletContext();
  const post = posts.find((post) => post.id === postId);

  if (!post) {
    return <div>Post not found</div>;
  }

  const now = new Date();
  const postDate = new Date(post.updatedAt);
  const currentYear = getYear(now);
  const postYear = getYear(postDate);

  // Determine the distance and relative format
  const distance = formatDistanceToNow(postDate, { addSuffix: true });
  const relative = formatRelative(postDate, now);

  // Custom format for dates older than 5 days
  const customDateFormat =
    postYear === currentYear
      ? format(postDate, "EEE, MMM d 'at' h:mm a")
      : format(postDate, "EEE, MMM d, yyyy 'at' h:mm a");

  const combinedDate =
    postDate > subDays(now, 5) ? `${distance} • ${relative}` : customDateFormat;

  return (
    <div className="single-post">
      <div className="card h-100">
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
              <span>
                <i className="bi bi-hand-thumbs-up"></i> {post.likes.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="comments mt-3">
        <h5>Comments ({post.comments.length})</h5>
        {post.comments.map((comment) => (
          <div key={comment.id} className="comment">
            <p>
              <strong>{comment.author.username}:</strong> {comment.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
