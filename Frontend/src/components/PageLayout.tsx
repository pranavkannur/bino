import { Outlet } from "react-router";
import Navbar from "./Navbar";

export default function PageLayout() {
  return (
    <>
      <Navbar />
      <main className="shell py-10 sm:py-16">
        <Outlet />
      </main>
    </>
  );
}