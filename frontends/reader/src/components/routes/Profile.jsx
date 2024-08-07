import axios from "axios";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Link } from "react-router-dom";

import { redirectTo } from "../../redirectTo";

export function Profile() {
  const [user] = useOutletContext();
  const [loading, setLoading] = useState(false);

  async function handleLogout(event) {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3000/api/logout");
      if (response.status === 200) {

        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        setTimeout(() => {
          redirectTo("/");
        }, 1500);
      } else {
        console.error("Logout failed with status", response.status);
      }
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
  }

  return (
    <div className="text-center">
      <h1 className="mb-0">
        {user.firstName} {user.lastName}
      </h1>
      <Link to="/profile">@{user.username}</Link>
      <form className="my-3" onSubmit={handleLogout}>
        <button className="btn btn-danger" type="submit" disabled={loading}>
          {loading ? "Logging out..." : "Logout"}
        </button>
      </form>
    </div>
  );
}
