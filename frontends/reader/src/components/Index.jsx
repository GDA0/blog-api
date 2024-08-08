import { useOutletContext } from "react-router-dom";
import { PostList } from "./PostList";

export function Index() {
  const [, posts] = useOutletContext();
  return <PostList posts={posts} />;
}
