import { Header } from "../Header";
import { Footer } from "../Footer";
import { Outlet } from "react-router-dom";

export function Root() {
  return (
    <>
      <Header />
      <main className="my-5 py-3">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
