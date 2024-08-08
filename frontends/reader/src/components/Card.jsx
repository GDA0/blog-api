import PropTypes from "prop-types";
import {
  formatDistanceToNow,
  formatRelative,
  format,
  subDays,
  getYear,
} from "date-fns";
import { Link } from "react-router-dom";

const Card = ({
  id,
  title,
  content,
  author,
  updatedAt,
  commentsCount,
}) => {
  const excerpt =
    content.length > 100 ? content.substring(0, 100) + "..." : content;

  const now = new Date();
  const postDate = new Date(updatedAt);
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
    <div className="card h-100">
      <div className="card-body d-flex flex-column justify-content-between">
        <div className="mb-3">
          <p className="card-text mb-1 small">
            <Link to="/">@{author}</Link> |{" "}
            <span className="text-body-secondary">{combinedDate}</span>
          </p>
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{excerpt}</p>
        </div>
        <div className="d-flex justify-content-between">
          <Link className="card-link" to={`/${id}`}>
            Read More
          </Link>
          <div>
            <span className="me-2">
              <i className="bi bi-chat"></i> {commentsCount}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
  commentsCount: PropTypes.number.isRequired,
};

export default Card;
