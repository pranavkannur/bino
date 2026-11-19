import { useState, type FormEvent } from "react";
import { Link, Navigate, useLocation } from "react-router";
import { api } from "../lib/api";
import { useAuthStore } from "../store/useAuthStore";

type AuthFormProps = {
    mode: "login" | "signup";
};

export default function AuthFrom({ mode }: AuthFormProps) {
    const isSignup = mode === "signup";
    const { user, checking, setUser } = useAuthStore();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const location = useLocation();

    const destination = location.state?.from ?? "/profile";

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setLoading(true);
        setError("");
        const body = Object.fromEntries(new FormData(event.currentTarget));

        try{
            const {data} =await api.post(isSignup ? "/auth/signup" : "/auth/signin", body);
            setUser(data.user);
        }catch(err){
            setError( err instanceof Error ? err.message : "Try again");
        }finally{
            setLoading(false);
        }
    }

    if (checking) return<p className=" text-zinc-400">Checking Session ...</p>;

    if (user) return <Navigate to ={destination} replace />;

    return(
        <section className="panel mx-auto max-w-md">
        <h1 className="page-title">
          {isSignup ? "Create an account" : "Log in"}
        </h1>
        <form className="mt-7 grid gap-5" onSubmit={handleSubmit}>
          {isSignup && (
            <label className="field">
              Username
              <input
                name="username"
                autoComplete="username"
                minLength={2}
                maxLength={30}
                required
              />
            </label>
          )}
          <label className="field">
            Email
            <input name="email" type="email" autoComplete="email" required />
          </label>
          <label className="field">
            Password
            <input
              name="password"
              type="password"
              autoComplete={isSignup ? "new-password" : "current-password"}
              minLength={8}
              maxLength={72}
              required
            />
          </label>
          {error && <p role="alert" className="error">{error}</p>}
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Please wait…" : isSignup ? "Create account" : "Log in"}
          </button>
        </form>
        <p className="mt-5 text-sm text-zinc-400">
          {isSignup ? "Already have an account? " : "New to Exchange? "}
          <Link className="text-zinc-100 underline" to={isSignup ? "/login" : "/signup"}>
            {isSignup ? "Log in" : "Sign up"}
          </Link>
        </p>
      </section>
    );
    
}