import { useOutletContext } from "react-router-dom";
import { Link } from "react-router-dom";

export function Index() {
  const [posts] = useOutletContext();

  if (!posts || posts.length === 0) {
    return;
  }

  const publishedPosts = posts.filter((post) => post.published);
  const unpublishedPosts = posts.filter((post) => !post.published);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <p>
            Total Posts: <strong>{posts.length}</strong>
          </p>
          <p>
            Published Posts: <strong>{publishedPosts.length}</strong>
          </p>
          <p>
            Unpublished Posts: <strong>{unpublishedPosts.length}</strong>
          </p>
        </div>
        <div>
          <Link to="/create-post" className="btn btn-primary">
            Create Post
          </Link>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-hover table-bordered">
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <td>
                  <Link to={`/${post.id}`}>{post.title}</Link>
                </td>
                <td>{post.published ? "Published" : "Unpublished"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
