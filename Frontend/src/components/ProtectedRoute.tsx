import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router";
import { useAuthStore } from "../store/useAuthStore";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
    const { user, checking, sessionError } = useAuthStore();
    const location = useLocation();

    if (checking) {
        return <p className="text-zinc-400">Checking session…</p>;
    }

    if (sessionError) {
        return (
            <div>
                <p role="alert" className=" error">{sessionError}</p>
                <button className=" btn-secondary mt-4" onClick={() => window.location.reload()}>Retry</button>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace state={{ from: location.pathname }} />;
    }
    return children;
}