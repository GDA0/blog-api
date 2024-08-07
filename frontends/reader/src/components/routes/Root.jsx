import { useState, useEffect } from "react";
import { Header } from "../Header";
import { Footer } from "../Footer";
import { Outlet } from "react-router-dom";
import axios from "axios";

export function Root() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:3000/api", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { user } = response.data;
        setUser(user);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token]);

  return (
    <>
      <Header user={user} />
      <main className="container my-5 py-3">
        {loading && (
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        <Outlet context={[user]} />
      </main>
      <Footer />
    </>
  );
}
