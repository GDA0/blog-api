import { useOutletContext } from "react-router-dom";
import { PostList } from "./PostList";

export function Index() {
  const [, posts] = useOutletContext();

  if (!posts || posts.length === 0) {
    return <div>No posts available.</div>;
  }

  return <PostList posts={posts} />;
}
