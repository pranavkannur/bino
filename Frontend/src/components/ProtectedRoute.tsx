import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router";
import {useSession } from "../hooks/useSession";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, isPending, error, refetch } = useSession();
  const location = useLocation();

  if (isPending) {
    return <p className="text-zinc-400">Checking session…</p>;
  }

  if (error) {
    return (
      <div>
        <p role="alert" className="error">
          {error.message}
        </p>
        <button className="btn-secondary mt-4" onClick={() => refetch()}>
          Retry
        </button>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  return children;
}
