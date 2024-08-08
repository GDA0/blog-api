import { useState, useEffect } from "react";
import { Header } from "../Header";
import { Footer } from "../Footer";
import { Outlet } from "react-router-dom";
import axios from "../../axios-instance";

export function Root() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/");
        const { user, posts } = response.data;

        setUser(user);
        setPosts(posts);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <>
      <Header user={user} />
      <main className="container my-5 py-3">
        {loading && (
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        <Outlet context={[user, posts]} />
      </main>
      <Footer />
    </>
  );
}
