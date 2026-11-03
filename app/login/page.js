
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      router.replace("/dashboard");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Login failed"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <div className="auth-container">
        <header className="auth-header">
          <Link href="/" className="auth-logo">
            ✦ DIT205<span>Cloud</span>
          </Link>

          <p>WELCOME BACK</p>

          <h1>
            Sign In to <span>Your Account.</span>
          </h1>

          <p className="auth-description">
            Access your secure cloud dashboard
            using your registered account.
          </p>
        </header>

        <div className="auth-card">
          <div className="auth-card-heading">
            <h2>Welcome Back!</h2>
            <p>Enter your credentials to continue.</p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="auth-field">
              <label htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="auth-field">
              <label htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="auth-submit"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In →"}
            </button>
          </form>

          {error && (
            <div className="auth-error" role="alert">
              {error}
            </div>
          )}

          <div className="auth-divider">
            <span>NEW TO THIS PLATFORM?</span>
          </div>

          <Link href="/register" className="auth-alt">
            Create a New Account
          </Link>
        </div>

        <footer className="auth-footer">
          <p>Shin Ko Htut · 6807866</p>
          <p>DIT205 – Web Deploy on Cloud</p>
        </footer>
      </div>
    </main>
  );
}
