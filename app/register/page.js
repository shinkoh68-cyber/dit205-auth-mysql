
"use client";

import { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  async function handleRegister(e) {
    e.preventDefault();

    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Registration failed"
        );
      }

      setSuccess(
        "Account created successfully! You can now log in."
      );

      setForm({
        fullname: "",
        email: "",
        password: "",
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <Link href="/" className="auth-logo">
            ✦ DIT205<span>Cloud</span>
          </Link>

          <p>WELCOME TO OUR PLATFORM</p>

          <h1>
            Create Your <span>Account.</span>
          </h1>

          <p className="auth-description">
            Join our secure cloud authentication platform
            built with Next.js and TiDB Cloud.
          </p>
        </div>

        <div className="auth-card">
          <div className="auth-card-heading">
            <h2>Get Started</h2>
            <p>Enter your information to create an account.</p>
          </div>

          <form onSubmit={handleRegister}>
            <div className="auth-field">
              <label htmlFor="fullname">
                Full Name
              </label>
              <input
                id="fullname"
                type="text"
                placeholder="Enter your full name"
                autoComplete="name"
                required
                value={form.fullname}
                onChange={(e) =>
                  setForm({
                    ...form,
                    fullname: e.target.value,
                  })
                }
              />
            </div>

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
                value={form.email}
                onChange={(e) =>
                  setForm({
                    ...form,
                    email: e.target.value,
                  })
                }
              />
            </div>

            <div className="auth-field">
              <label htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Minimum 8 characters"
                minLength={8}
                autoComplete="new-password"
                required
                value={form.password}
                onChange={(e) =>
                  setForm({
                    ...form,
                    password: e.target.value,
                  })
                }
              />
            </div>

            <button
              type="submit"
              className="auth-submit"
              disabled={loading}
            >
              {loading
                ? "Creating Account..."
                : "Create Account →"}
            </button>
          </form>

          {success && (
            <div className="auth-success" role="status">
              ✓ {success}
            </div>
          )}

          {error && (
            <div className="auth-error" role="alert">
              {error}
            </div>
          )}

          <div className="auth-divider">
            <span>ALREADY A MEMBER?</span>
          </div>

          <Link href="/login" className="auth-alt">
            Sign In to Your Account
          </Link>
        </div>

        <div className="auth-footer">
          <p>Shin Ko Htut · 6807866</p>
          <p>DIT205 – Web Deploy on Cloud</p>
        </div>
      </div>
    </main>
  );
}
