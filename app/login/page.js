
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

  async function handleLogin(event) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      router.replace("/dashboard");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Login failed"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={styles.main}>
      <form onSubmit={handleLogin} style={styles.card}>
        <h1 style={styles.heading}>Welcome Back</h1>

        <p style={styles.subtitle}>
          DIT205 MySQL Authentication
        </p>

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          required
          autoComplete="current-password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <button
          type="submit"
          disabled={loading}
          style={styles.button}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {error && (
          <p role="alert" style={styles.error}>
            {error}
          </p>
        )}

        <p style={styles.subtitle}>
          Don't have an account?{" "}
          <Link
            href="/register"
            style={{ color: "#c4b5fd" }}
          >
            Register
          </Link>
        </p>
      </form>
    </main>
  );
}

const styles = {
  main: {
    minHeight: "100vh",
    display: "grid",
    placeItems: "center",
    background: "#0f172a",
    padding: 20,
  },
  card: {
    width: "100%",
    maxWidth: 420,
    background: "#1e293b",
    color: "#ffffff",
    borderRadius: 16,
    padding: 32,
  },
  heading: {
    marginBottom: 10,
  },
  subtitle: {
    color: "#cbd5e1",
    marginTop: 16,
    marginBottom: 24,
  },
  input: {
    width: "100%",
    padding: 12,
    marginTop: 8,
    marginBottom: 18,
    background: "#0f172a",
    border: "1px solid #475569",
    borderRadius: 8,
    color: "white",
  },
  button: {
    width: "100%",
    background: "#8b5cf6",
    color: "white",
    padding: 13,
    border: 0,
    borderRadius: 8,
    cursor: "pointer",
  },
  error: {
    color: "#fca5a5",
    marginTop: 16,
  },
};
