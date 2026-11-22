// src/components/Navbar.tsx
import { Link } from "react-router";
import { useLogout } from "../hooks/useAuth";
import { useSession } from "../hooks/useSession";

export default function Navbar() {
  const { user, isPending } = useSession();
  const logout = useLogout();

  return (
    <header className="border-b border-zinc-800">
      <nav className="shell flex min-h-16 flex-wrap items-center gap-5 py-3">
        <Link to="/" className="text-xl font-bold tracking-tight">
          Exchange<span className="text-lime-300">.</span>
        </Link>

        <Link to="/" className="nav-link">Home</Link>
        <Link to="/stocks" className="nav-link">Stocks</Link>

        <div className="ml-auto flex flex-wrap items-center gap-4">
          {isPending ? (
            <span className="nav-link">Checking session…</span>
          ) : user ? (
            <>
              <Link to="/profile" className="nav-link">{user.username}</Link>
              <button
                className="btn-secondary"
                onClick={() => logout.mutate()}
                disabled={logout.isPending}
              >
                {logout.isPending ? "Logging out…" : "Logout"}
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/signup" className="btn-primary">Signup</Link>
            </>
          )}
        </div>
      </nav>

      {logout.isError && (
        <p role="alert" className="shell error pb-3">{logout.error.message}</p>
      )}
    </header>
  );
}