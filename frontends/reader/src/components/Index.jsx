import { useOutletContext } from "react-router-dom";
import { PostList } from "./PostList";

export function Index() {
  const [, posts] = useOutletContext();

  if (!posts || posts.length === 0) {
    return;
  }

  return <PostList posts={posts} />;
}
